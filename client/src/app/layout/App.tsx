import React , { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import CustomerDashboard from '../../features/customers/dashboard/CustomerDashboard';
import { useStore } from '../api/stores/store';
import { observer } from 'mobx-react-lite';


function App() {
 const {customerStore} = useStore();

  useEffect (() => {
    customerStore.loadCustomers();
 }, [customerStore])

   
  if(customerStore.loading) return <h2>Loading</h2>

  return (
    <Fragment>
       <NavBar />
       <Container style={{marginTop: '7em'}}>
         <CustomerDashboard  />
       </Container> 
     </Fragment>
  );
}

export default observer(App);
