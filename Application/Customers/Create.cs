using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.Interfaces;
using MediatR;
using Persistence;

namespace Application.Customers
{
    public class Create
    {
        public class Command : IRequest
        {
            public Customer Customer { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IGenericRepository<Customer> genericRepository;
            private readonly IMapper mapper;

            public Handler(IGenericRepository<Customer> genericRepository, IMapper mapper)
            {
                this.genericRepository = genericRepository;
                this.mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var customer = new Customer();
                mapper.Map(request.Customer, customer);
                await genericRepository.Add(customer);
                await genericRepository.SaveAsync();
                return Unit.Value;
            }
        }
    }
}
