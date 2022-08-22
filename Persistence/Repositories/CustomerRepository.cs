using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class CustomerRepository : ICustomerRepository

    {
        private readonly DataContext context;

        public CustomerRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<List<Customer>> GetAllAsync()
        {
            try
            {
                List<Customer> listOfCustomers = await context.Customers.ToListAsync();
                return listOfCustomers;
            }
            catch (Exception ex)
            {
                throw new Exception("Cound not get list of customers", ex);
            }  
        }


        public async Task<Customer> GetByIdAsync(Guid id)
        {

            var customer = await context.Customers.FindAsync(id);
            if (customer == null) throw new Exception("Customer not found");
            return customer;
        }

        public async Task DeleteByIdAsync(Guid id)
        {
            try
            {
                var customer = await context.Customers.FindAsync(id);
                context.Remove(customer);
            }
            catch (Exception ex)
            {
                throw new Exception("Customer not found", ex);
            }
        }


        public async Task AddAsync(Customer customer)
        {
            await context.Set<Customer>().AddAsync(customer);
        }   
    }
}
