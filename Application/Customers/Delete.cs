using Application.Interfaces;
using Domain;
using Domain.Interfaces;
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
            private readonly IGenericRepository<Customer> genericRepository;

            public Handler(IGenericRepository<Customer> genericRepository)
            {
                this.genericRepository = genericRepository;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var customer = await genericRepository.GetByIdAsync(request.Id);
                genericRepository.Remove(customer);
                await genericRepository.SaveAsync();
                return Unit.Value;
            }
        }
    }
}
