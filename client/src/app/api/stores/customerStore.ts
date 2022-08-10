import { makeAutoObservable, runInAction } from 'mobx';
import { Customer } from '../../models/customer';
import agent from '../agent';
import {v4 as uuid} from 'uuid';

export default class CustomerStore {
    customers: Customer[] = [];
    selectedCustomer: Customer | undefined = undefined;
    editMode = false;
    loading = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadCustomers = async () => {
       this.setLoading(true);
        try {
           const customers = await agent.Customers.list();
           customers.forEach((customer) => {
           this.customers.push(customer);
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
        this.selectedCustomer = this.customers.find(c => c.id === id);
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
                this.customers.push(customer);
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
                this.customers = [...this.customers.filter(c => c.id !== customer.id), customer];
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
               this.customers = [...this.customers.filter(c => c.id !== id)];
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