import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Customer } from '../models/customer';
import NavBar from './NavBar';
import CustomerDashboard from '../../features/customers/dashboard/CustomerDashboard';
import {v4 as uuid} from 'uuid'
import agent from '../api/agent';


function App() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect (() => {
    agent.Customers.list().then(response => {
      setCustomers(response);
    })
  }, [])

  function handleSelectCustomer(id: string){
    setSelectedCustomer(customers.find(x => x.id === id));
  }

  function handleCancelSelectCustomer(){
    setSelectedCustomer(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectCustomer(id) : handleCancelSelectCustomer();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditCustomer(customer: Customer) {
    setSubmitting(true);
    if(customer.id) {
      agent.Customers.update(customer).then(() => {
        setCustomers([...customers.filter(x => x.id !== customer.id), customer]) 
        setSelectedCustomer(customer);
        setEditMode(false); 
        setSubmitting(false);
      })
    } else {
      customer.id = uuid();
      agent.Customers.create(customer).then(() => {
        setCustomers([...customers, customer])
        setSelectedCustomer(customer);
        setEditMode(false); 
        setSubmitting(false);
      })
    }
  }

  function handleDeleteCustomer(id: string){
    setSubmitting(true);
    agent.Customers.delete(id).then(() => {
      setCustomers([...customers.filter(x => x.id !== id)])
      setSubmitting(false);
     })
   }


  return (
    <Fragment>
       <NavBar openForm={handleFormOpen}/>
       <Container style={{marginTop: '7em'}}>
         <CustomerDashboard 
         customers={customers}
         selectedCustomer={selectedCustomer}
         selectCustomer={handleSelectCustomer}
         cancelSelectCustomer={handleCancelSelectCustomer}
         editMode={editMode}
         openForm={handleFormOpen}
         closeForm={handleFormClose}
         createOrEdit={handleCreateOrEditCustomer}
         deleteCustomer={handleDeleteCustomer}
         submitting={submitting}
         />
       </Container> 
     </Fragment>
  );
}

export default App;
