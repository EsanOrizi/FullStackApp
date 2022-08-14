using Application.Interfaces;
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
            private readonly ICustomerRepository customerRepository;

            public Handler(ICustomerRepository customerRepository)
            {
                this.customerRepository = customerRepository;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                await customerRepository.DeleteByIdAsync(request.Id);
                return Unit.Value;
            }
        }
    }
}
