using Application.Interfaces;
using Domain.Interfaces;
using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext context;

        public UnitOfWork(DataContext context)
        {
            this.context = context;
        }

        public ICustomerRepository CustomerRepository => new CustomerRepository(context);

        public async Task<int> Complete()
        {
            return await context.SaveChangesAsync();
        }
      
    }
}
