using MediatR;
using Persistence;

namespace Application.Customers
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var customer = await context.Customers.FindAsync(request.Id);
                context.Remove(customer);
                await context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
