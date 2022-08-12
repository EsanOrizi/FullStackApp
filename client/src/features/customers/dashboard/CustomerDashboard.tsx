import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../../../app/api/stores/store';
import CustomerList from './CustomerList';

export default observer(function CustomerDashboard() {
    const { customerStore } = useStore();
    const { loadCustomers, customerRegistry } = customerStore;

    useEffect(() => {
        if (customerRegistry.size <= 1) loadCustomers();
    }, [customerRegistry.size, loadCustomers])
 
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    if (customerStore.loading) return <h2>Loading</h2>

    return (
        <CustomerList />
    )
})