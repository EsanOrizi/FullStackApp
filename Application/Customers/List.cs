using Application.Interfaces;
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
            private readonly ICustomerRepository customerRepository;

            public Handler(ICustomerRepository customerRepository)
            {
                this.customerRepository = customerRepository;
            }

            public async Task<List<Customer>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await customerRepository.GetAllAsync();
            }
        }
    }
}
