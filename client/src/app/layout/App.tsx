import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Customer } from '../models/customer';
import NavBar from './NavBar';
import CustomerDashboard from '../../features/customers/dashboard/CustomerDashboard';

function App() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  useEffect (() => {
    axios.get('https://localhost:7206/customers').then(response => {
      setCustomers(response.data);
    })
  }, [])

  return (
    <Fragment>
       <NavBar />
       <Container style={{marginTop: '7em'}}>
         <CustomerDashboard customers={customers} />
       </Container> 
     </Fragment>
  );
}

export default App;
