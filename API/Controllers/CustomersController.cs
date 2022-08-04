using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application;
using Application.Customers;

namespace API.Controllers
{
    public class CustomersController : BaseApiController
    {
        private readonly IMediator mediator;

        public CustomersController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Customer>>> GetCustomers()
        {
            return await this.mediator.Send(new List.Query());
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(Guid id)
        {
            return Ok();
        }

    }
}
