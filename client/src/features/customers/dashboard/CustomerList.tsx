import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useEffect, useState } from 'react';  
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/api/stores/store';

export default observer(function CustomerList() {
    const {customerStore} = useStore();
    const {deleteCustomer, customerArrayFromMap, loading} = customerStore;
    const [target, setTarget] = useState('');

    function handleCustomerDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteCustomer(id);
    }   
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <Segment>
            <Item.Group divided>
                {customerArrayFromMap.map(customer =>(
                    <Item key={customer.id}>
                        <Item.Content>
                            <Item.Header>{customer.name}</Item.Header>
                            <Item.Description>
                             <div>{customer.address}</div>
                             <div>{customer.email}</div>
                             <div>{customer.phone}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/customers/${customer.id}`} floated='right' content='View' color='blue' />
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