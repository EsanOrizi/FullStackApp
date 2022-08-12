import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

export default function HomePage() {
    return(
        <Container style={{marginTop: '7em'}}>
            <h1>HomePage</h1>
            <h3>Go to <Link to='/customers'>Customer List</Link></h3>
        </Container>
    )
}