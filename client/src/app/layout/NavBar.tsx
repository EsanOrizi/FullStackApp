import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../api/stores/store';


export default function NavBar(){

    const {customerStore} = useStore();
    return(
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
                FullStackApp
            </Menu.Item>
            <Menu.Item name='Customers' />
            <Menu.Item>
                <Button onClick={() => customerStore.openForm()} positive content='New Customer' />
            </Menu.Item>
        </Container>

    </Menu>
    )
}