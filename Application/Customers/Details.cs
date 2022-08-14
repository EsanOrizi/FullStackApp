using Application.Interfaces;
using Domain;
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
            private readonly ICustomerRepository customerRepository;

            public Handler(ICustomerRepository customerRepository)
            {
                this.customerRepository = customerRepository;
            }

            public async Task<Customer> Handle(Query request, CancellationToken cancellationToken)
            {
                return await customerRepository.GetByIdAsync(request.Id);
            }
        }
    }
}
