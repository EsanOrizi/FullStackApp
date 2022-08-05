import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar(){
    return(
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
                FullStackApp
            </Menu.Item>
            <Menu.Item name='Customers' />
            <Menu.Item>
                <Button positive content='New Customer' />
            </Menu.Item>
        </Container>

    </Menu>
    )
}