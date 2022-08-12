import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/api/stores/store';
import {v4 as uuid} from 'uuid';

export default observer(function CustomerForm(){
    const history = useHistory(); 
    const {customerStore} = useStore();
    const {createCustomer, updateCustomer, loading, loadCustomer} = customerStore;
    const {id} = useParams<{id: string}>();
    const [customer, setCustomer] = useState({
        id: '',
        name: '',
        address: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if(id) loadCustomer(id).then(customer => setCustomer(customer!));
    }, [id, loadCustomer]);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

   function handleSubmit() {
        if (customer.id.length === 0) {
            let newCustomer = {
                ...customer, 
                id: uuid()
            };
            createCustomer(newCustomer).then(() => history.push(`/customers/${newCustomer.id}`))
        } else {
            updateCustomer(customer).then(() => history.push(`/customers/${customer.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;  
        setCustomer({...customer, [name]: value})      
    }
 
    if(loading) return <h2>Loading</h2> 

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={customer.name} name='name' onChange={handleInputChange}/>
                <Form.Input placeholder='Address' value={customer.address} name='address' onChange={handleInputChange}/>
                <Form.Input placeholder='Email' value={customer.email} name='email' onChange={handleInputChange}/>
                <Form.Input placeholder='Phone' value={customer.phone} name='phone' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/customers' floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
})

