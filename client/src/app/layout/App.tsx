import { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import CustomerDashboard from '../../features/customers/dashboard/CustomerDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import CustomerForm from '../../features/customers/form/CustomerForm';
import CustomerDetails from '../../features/customers/details/CustomerDetails';


function App() {
  const location = useLocation();
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/customers' component={CustomerDashboard} />
              <Route path='/customers/:id' component={CustomerDetails} />
              <Route key={location.key} path={['/createCustomer', '/manage/:id']} component={CustomerForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
