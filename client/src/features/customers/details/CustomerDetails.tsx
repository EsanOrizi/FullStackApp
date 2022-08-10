import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import { useStore } from '../../../app/api/stores/store';


export default function CustomerDetails() {
    const {customerStore} = useStore();
    const {selectedCustomer: customer, openForm, cancelSelectedCustomer} = customerStore;
    
    if(!customer) return <h2>Loading</h2>

    return (
        <Card fluid>     
        <Card.Content>
          <Card.Header>{customer.name}</Card.Header>
          <Card.Description>
          {customer.address} <br />
          {customer.email} <br />
          {customer.phone} <br />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={() => openForm(customer.id)} basic color='blue' content='Edit' />
                <Button onClick={cancelSelectedCustomer} basic color='grey' content='Cancel' />
            </Button.Group>
        </Card.Content>
      </Card>
    )
}