import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Customer } from '../../../app/models/customer';
import CustomerDetails from '../details/CustomerDetails';
import CustomerForm from '../form/CustomerForm';
import CustomerList from './CustomerList';

interface Props {
    customers: Customer[];
    selectedCustomer: Customer | undefined;
    selectCustomer: (id: string) => void;
    cancelSelectCustomer: () => void;
}

export default function CustomerDashboard({customers, selectedCustomer, 
        selectCustomer, cancelSelectCustomer}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <CustomerList customers={customers} selectCustomer={selectCustomer}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCustomer && 
                <CustomerDetails customer={selectedCustomer} 
                 cancelSelectCustomer={cancelSelectCustomer} />
                }
                <CustomerForm />                
            </Grid.Column>
        </Grid>


    )
}