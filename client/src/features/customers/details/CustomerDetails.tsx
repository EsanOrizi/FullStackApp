import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import { Customer } from '../../../app/models/customer';

interface Props {
    customer: Customer;
    cancelSelectCustomer: () => void;
    openForm: (id: string) => void;
}

export default function CustomerDetails({customer, cancelSelectCustomer, openForm}: Props) {
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
                <Button onClick={cancelSelectCustomer} basic color='grey' content='Cancel' />
            </Button.Group>
        </Card.Content>
      </Card>
    )
}