using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Customers
{
    public class List
    {
        public class Query : IRequest<List<Customer>> { }

        public class Handler : IRequestHandler<Query, List<Customer>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<Customer>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Customers.ToListAsync();
            }
        }
    }
}
