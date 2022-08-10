import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/api/stores/store';

export default observer(function CustomerForm(){
     
    const {customerStore} = useStore();
    const {selectedCustomer, closeForm, createCustomer, updateCustomer, loading} = customerStore;

    const initialState = selectedCustomer ?? {
        id: '',
        name: '',
        address: '',
        email: '',
        phone: ''
    }

    const [customer, setCustomer] = useState(initialState)

    function handleSubmit() {
        customer.id ? updateCustomer(customer) : createCustomer(customer);
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
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
})