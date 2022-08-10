import { createContext, useContext } from 'react';
import CustomerStore from './customerStore';

interface Store {
    customerStore: CustomerStore
}

export const store: Store ={
    customerStore: new CustomerStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}