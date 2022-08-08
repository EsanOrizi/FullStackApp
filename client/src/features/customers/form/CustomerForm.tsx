import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Customer } from '../../../app/models/customer';

interface Props {
    customer: Customer | undefined;
    closeForm: () => void;  
    createOrEdit: (customer: Customer) => void; 
}

export default function CustomerForm({customer: selectedCustomer, closeForm, createOrEdit}: Props){
    
    const initialState = selectedCustomer ?? {
        id: '',
        name: '',
        address: '',
        email: '',
        phone: ''
    }

    const [customer, setCustomer] = useState(initialState)

    function handleSubmit() {
        createOrEdit(customer);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;  
        setCustomer({...customer, [name]: value})      
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={customer.name} name='name' onChange={handleInputChange}/>
                <Form.Input placeholder='Address' value={customer.address} name='address' onChange={handleInputChange}/>
                <Form.Input placeholder='Email' value={customer.email} name='email' onChange={handleInputChange}/>
                <Form.Input placeholder='Phone' value={customer.phone} name='phone' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
}