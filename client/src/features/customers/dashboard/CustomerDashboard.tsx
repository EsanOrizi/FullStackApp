import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Customer } from '../../../app/models/customer';
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
        </Grid>


    )
}