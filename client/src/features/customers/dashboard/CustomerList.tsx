import React, { SyntheticEvent, useState } from 'react';  
import { Button, Item, Segment } from 'semantic-ui-react';
import { Customer } from '../../../app/models/customer';

interface Props {
    customers: Customer[];
    selectCustomer: (id: string) => void;
    deleteCustomer: (id: string) => void;
    submitting: boolean;
}

export default function CustomerList({customers, selectCustomer, deleteCustomer, submitting}: Props) {
    const [target, setTarget] = useState('');

    function handleCustomerDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteCustomer(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {customers.map(customer =>(
                    <Item key={customer.id}>
                        <Item.Content>
                            <Item.Header>{customer.name}</Item.Header>
                            <Item.Description>
                             <div>{customer.address}</div>
                             <div>{customer.email}</div>
                             <div>{customer.phone}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectCustomer(customer.id)} floated='right' content='View' color='blue' />
                                <Button 
                                 name={customer.id}
                                 loading={submitting && target === customer.id}
                                 onClick={(e) => handleCustomerDelete(e, customer.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item> 
                    ))}
            </Item.Group>

        </Segment>
    )
}