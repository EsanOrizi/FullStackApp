using Application.Interfaces;
using Domain;
using Domain.Interfaces;
using MediatR;
using Persistence;

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
            private readonly IGenericRepository<Customer> genericRepository;

            public Handler(IGenericRepository<Customer> genericRepository)
            {
                this.genericRepository = genericRepository;
            }

            public async Task<Customer> Handle(Query request, CancellationToken cancellationToken)
            {
                return await genericRepository.GetByIdAsync(request.Id);
            }
        }
    }
}
