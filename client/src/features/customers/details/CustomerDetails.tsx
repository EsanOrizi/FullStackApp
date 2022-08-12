import { observe } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';
import { useStore } from '../../../app/api/stores/store';


export default observer( function CustomerDetails() {
    const {customerStore} = useStore();
    const {selectedCustomer: customer, loadCustomer, loading} = customerStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
      if(id)  loadCustomer(id);
    }, [id, loadCustomer]);

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    
    if(loading || !customer) return <h2>Loading</h2>

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
                <Button as={Link} to={`/manage/${customer.id}`} basic color='blue' content='Edit' />
                <Button as={Link} to={'/customers'} basic color='grey' content='Cancel' />
            </Button.Group>
        </Card.Content>
      </Card>
    )
} )