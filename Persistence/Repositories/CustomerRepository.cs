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
            return await context.Customers.ToListAsync();
        }


        public async Task<Customer> GetByIdAsync(Guid id)
        {
            return await context.Customers.FindAsync(id);
        }

        
        public async Task DeleteByIdAsync(Guid id)
        {
            var customer = await context.Customers.FindAsync(id);
            context.Remove(customer);
         
        }

        public async Task AddAsync(Customer customer)
        {
             await context.Set<Customer>().AddAsync(customer);
        }
    
    }
}
