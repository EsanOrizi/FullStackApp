import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [customers, setCustomers] = useState([]);
  useEffect (() => {
    axios.get('https://localhost:7206/customers').then(response => {
      setCustomers(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Customers'/>
        <List>  
        {customers.map((customer: any) => (
          <List.Item key={customer.id}>
             {customer.name}
          </List.Item>
        ))}
       </List>  
     </div>
  );
}

export default App;
