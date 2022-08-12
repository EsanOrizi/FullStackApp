import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar(){
    return(
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item exact as={NavLink} to='/' header>
                FullStackApp
            </Menu.Item>
            <Menu.Item as={NavLink} to='/customers' name='Customers' />
            <Menu.Item>
                <Button as={NavLink} to='/createCustomer' positive content='New Customer' />
            </Menu.Item>
        </Container>

    </Menu>
    )
}