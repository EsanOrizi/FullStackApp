import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Customer } from '../models/customer';
import NavBar from './NavBar';
import CustomerDashboard from '../../features/customers/dashboard/CustomerDashboard';

function App() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);

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

  return (
    <Fragment>
       <NavBar />
       <Container style={{marginTop: '7em'}}>
         <CustomerDashboard 
         customers={customers}
         selectedCustomer={selectedCustomer}
         selectCustomer={handleSelectCustomer}
         cancelSelectCustomer={handleCancelSelectCustomer}
         />
       </Container> 
     </Fragment>
  );
}

export default App;
