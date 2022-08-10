import { makeAutoObservable, runInAction } from 'mobx';
import { Customer } from '../../models/customer';
import agent from '../agent';
import {v4 as uuid} from 'uuid';

export default class CustomerStore {
    customerRegistry = new Map<string, Customer>();
    selectedCustomer: Customer | undefined = undefined;
    editMode = false;
    loading = false;

    constructor() {
        makeAutoObservable(this)
    }

    get customerArrayFromMap() {
        return Array.from(this.customerRegistry.values());
      }

    loadCustomers = async () => {
       this.setLoading(true);
        try {
           const customers = await agent.Customers.list();
           customers.forEach((customer) => {
           this.customerRegistry.set(customer.id, customer);  
        });
          this.setLoading(false);
        }catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    };

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    selectCustomer = (id: string) => {
        this.selectedCustomer = this.customerRegistry.get(id);
    }

    cancelSelectedCustomer = () => {
        this.selectedCustomer =  undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectCustomer(id) : this.cancelSelectedCustomer();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createCustomer = async (customer: Customer) => {
        this.loading = true;
        customer.id = uuid();
        try {
            await agent.Customers.create(customer);
            runInAction(() => {
                this.customerRegistry.set(customer.id, customer);
                this.selectedCustomer = customer;
                this.editMode = false;
                this.loading = false;
            })                  
        } catch (error) {
            console.log(error);
            runInAction(() => {
            this.loading = false;
        })}
    }

     
    updateCustomer = async (customer: Customer) => {
        this.loading = true;
        try {
            await agent.Customers.update(customer);
            runInAction(() => {
                this.customerRegistry.set(customer.id, customer);
                this.selectedCustomer = customer;
                this.editMode = false;
                this.loading = false;
            })     
        } catch (error) {
            console.log(error);
            runInAction(() => {
            this.loading = false;
        })}
    }

    deleteCustomer = async (id: string) => {
        this.loading = true;
        try {
           await agent.Customers.delete(id);
           runInAction(() => {
               this.customerRegistry.delete(id);
               if (this.selectedCustomer?.id === id) this.cancelSelectedCustomer();
               this.loading = false;
           })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}