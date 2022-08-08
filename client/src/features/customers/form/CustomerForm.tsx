import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

export default function CustomerForm(){
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Name' />
                <Form.Input placeholder='Address' />
                <Form.Input placeholder='Email' />
                <Form.Input placeholder='Phone' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
}