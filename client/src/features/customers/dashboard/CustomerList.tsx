import React from 'react';  
import { Button, Item, Segment } from 'semantic-ui-react';
import { Customer } from '../../../app/models/customer';

interface Props {
    customers: Customer[];
    selectCustomer: (id: string) => void;
    deleteCustomer: (id: string) => void;
}

export default function CustomerList({customers, selectCustomer, deleteCustomer}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {customers.map(customer =>(
                    <Item key={customer.id}>
                        <Item.Content>
                            <Item.Header as='as'>{customer.name}</Item.Header>
                            <Item.Description>
                             <div>{customer.address}</div>
                             <div>{customer.email}</div>
                             <div>{customer.phone}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectCustomer(customer.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteCustomer(customer.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item> 
                    ))}
            </Item.Group>

        </Segment>
    )
}