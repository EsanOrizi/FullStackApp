import axios, { AxiosResponse } from 'axios';
import { Customer } from '../models/customer';

axios.defaults.baseURL= 'https://localhost:7206/customers';

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Customers = {
    list: () => requests.get<Customer[]>(''),
    details: (id: string) => requests.get<Customer>(`/${id}`),
    create: (customer: Customer) => axios.post<void>('/', customer),
    update: (customer: Customer) => axios.put<void>(`/${customer.id}`, customer),  
    delete: (id: string) => axios.delete<void>(`/${id}`)
}

const agent = {
    Customers
}

export default agent;