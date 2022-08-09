import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Customer } from '../../../app/models/customer';
import CustomerDetails from '../details/CustomerDetails';
import CustomerForm from '../form/CustomerForm';
import CustomerList from './CustomerList';

interface Props {
    customers: Customer[];
    selectedCustomer: Customer | undefined;
    selectCustomer: (id: string) => void;
    cancelSelectCustomer: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (customer: Customer) => void;
    deleteCustomer: (id: string) => void;
    submitting: boolean;
}

export default function CustomerDashboard({customers, selectedCustomer, deleteCustomer, submitting,
        selectCustomer, cancelSelectCustomer, editMode, openForm ,closeForm, createOrEdit}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <CustomerList customers={customers} 
                   selectCustomer={selectCustomer}
                   deleteCustomer={deleteCustomer}
                   submitting={submitting}
                   />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCustomer && !editMode && 
                <CustomerDetails customer={selectedCustomer} 
                 cancelSelectCustomer={cancelSelectCustomer} 
                 openForm={openForm}
                 />
                }
                {editMode &&
                <CustomerForm submitting={submitting} closeForm={closeForm} customer={selectedCustomer} createOrEdit={createOrEdit} /> }                
            </Grid.Column>
        </Grid>
    )
}