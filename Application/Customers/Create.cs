using Application.Interfaces;
using AutoMapper;
using Domain;
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
            private readonly ICustomerRepository customerRepository;
            private readonly IMapper mapper;

            public Handler(ICustomerRepository customerRepository, IMapper mapper)
            {
                this.customerRepository = customerRepository;
                this.mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var customer = new Customer();
                mapper.Map(request.Customer, customer);
                await customerRepository.AddAsync(customer);
                await customerRepository.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
