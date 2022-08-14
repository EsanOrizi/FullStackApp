using Application.Interfaces;
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
            private readonly ICustomerRepository customerRepository;
            private readonly IMapper mapper;

            public Handler(ICustomerRepository customerRepository, IMapper mapper)
            {
                this.customerRepository = customerRepository;
                this.mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var customer = await customerRepository.GetByIdAsync(request.Customer.Id);
                mapper.Map(request.Customer, customer);
                await customerRepository.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
