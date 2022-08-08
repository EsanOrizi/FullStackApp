import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void;
}

export default function NavBar({openForm}: Props){
    return(
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
                FullStackApp
            </Menu.Item>
            <Menu.Item name='Customers' />
            <Menu.Item>
                <Button onClick={openForm} positive content='New Customer' />
            </Menu.Item>
        </Container>

    </Menu>
    )
}