import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';  
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/api/stores/store';

export default observer(function CustomerList() {
    const {customerStore} = useStore();
    const {deleteCustomer, customers, loading} = customerStore;
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
                                <Button onClick={() => customerStore.selectCustomer(customer.id)} floated='right' content='View' color='blue' />
                                <Button 
                                 name={customer.id}
                                 loading={loading && target === customer.id}
                                 onClick={(e) => handleCustomerDelete(e, customer.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item> 
                    ))}
            </Item.Group>

        </Segment>
    )
})