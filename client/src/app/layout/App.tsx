import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Customer } from '../models/customer';
import NavBar from './NavBar';
import CustomerDashboard from '../../features/customers/dashboard/CustomerDashboard';
import {v4 as uuid} from 'uuid'


function App() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  
  useEffect (() => {
    axios.get('https://localhost:7206/customers').then(response => {
      setCustomers(response.data);
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
    customer.id 
       ? setCustomers([...customers.filter(x => x.id !== customer.id), customer])  
       : setCustomers([...customers, {...customer, id: uuid()}]);
    setEditMode(false);
    setSelectedCustomer(customer);
  }

  function handleDeleteCustomer(id: string){
    setCustomers([...customers.filter(x => x.id !== id)])
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
         />
       </Container> 
     </Fragment>
  );
}

export default App;
