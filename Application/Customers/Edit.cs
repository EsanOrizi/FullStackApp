using AutoMapper;
using Domain;
using MediatR;
using Persistence;

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
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var customer = await context.Customers.FindAsync(request.Customer.Id);

                mapper.Map(request.Customer, customer);

                await context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
