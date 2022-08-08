import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import { Customer } from '../../../app/models/customer';

interface Props {
    customer: Customer
}

export default function CustomerDetails({customer}: Props) {
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
                <Button basic color='blue' content='Edit' />
                <Button basic color='grey' content='Cancel' />
            </Button.Group>

        </Card.Content>
      </Card>
    )
}