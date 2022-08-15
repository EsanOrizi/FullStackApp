using Application.Interfaces;
using Domain;
using Domain.Interfaces;
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
            private readonly IGenericRepository<Customer> genericRepository;

            public Handler(IGenericRepository<Customer> genericRepository)
            {
                this.genericRepository = genericRepository;
            }

            public async Task<List<Customer>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await genericRepository.ListAllAsync();
            }
        }
    }
}
