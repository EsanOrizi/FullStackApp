import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Customer } from '../models/customer';
import NavBar from './NavBar';

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
        <List>  
        {customers.map((customer) => (
          <List.Item key={customer.id}>
             {customer.name}
          </List.Item>
        ))}
       </List> 
       </Container> 
     </Fragment>
  );
}

export default App;
