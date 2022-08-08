import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Customer } from '../../../app/models/customer';
import CustomerDetails from '../details/CustomerDetails';
import CustomerForm from '../form/CustomerForm';
import CustomerList from './CustomerList';

interface Props {
    customers: Customer[];
}

export default function CustomerDashboard({customers}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <CustomerList customers={customers} />
            </Grid.Column>
            <Grid.Column width='6'>
                {customers[0] && 
                <CustomerDetails customer={customers[0]} /> }
                <CustomerForm />
            </Grid.Column>
        </Grid>


    )
}