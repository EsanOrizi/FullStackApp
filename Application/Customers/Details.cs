using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Customers
{
    public class Details
    {
        public class Query : IRequest<Customer>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Customer>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Customer> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Customers.FindAsync(request.Id);
            }
        }
    }
}
