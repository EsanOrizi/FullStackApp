import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/api/stores/store';
import CustomerDetails from '../details/CustomerDetails';
import CustomerForm from '../form/CustomerForm';
import CustomerList from './CustomerList';

export default observer( function CustomerDashboard() {
    const {customerStore} = useStore(); 
    const {selectedCustomer, editMode} = customerStore;       
    return (
        <Grid>
            <Grid.Column width='10'>
                <CustomerList 
                   />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCustomer && !editMode && 
                <CustomerDetails />
                }
                {editMode &&
                <CustomerForm 
                /> }                
            </Grid.Column>
        </Grid>
    )
} )