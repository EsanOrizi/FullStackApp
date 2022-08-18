import { makeAutoObservable, runInAction } from 'mobx';
import { Customer } from '../../models/customer';
import agent from '../agent';

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
           this.setCustomer(customer);  
        });
          this.setLoading(false);
        }catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    };

    loadCustomer =async (id:string) => {
        let customer = this.getCustomer(id);
        if (customer) {
            this.selectedCustomer = customer;
            return customer; 
        } else {
            this.loading = true;
            try {
                customer = await agent.Customers.details(id);
                this.setCustomer(customer);
                runInAction(() => {
                this.selectedCustomer = customer;
                this.loading = false;
                });                
                return customer; 
            } catch (error) {
               console.log(error); 
               this.loading = false;
            }
        }
    }

    private setCustomer = (customer: Customer) => {
          this.customerRegistry.set(customer.id, customer);
    }

    private getCustomer = (id: string) => {
        return this.customerRegistry.get(id);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    createCustomer = async (customer: Customer) => {
        this.loading = true;
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