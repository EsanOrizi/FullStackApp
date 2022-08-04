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
    public class Edit
    {
        public class Command : IRequest
        {
            public Customer Customer { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var customer = await context.Customers.FindAsync(request.Customer.Id);

                customer.Name = request.Customer.Name ?? customer.Name;

                await this.context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
