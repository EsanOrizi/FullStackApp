using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Customers;

namespace API.Controllers
{
    public class CustomersController : BaseApiController
    {
       
        [HttpGet]
        public async Task<ActionResult<List<Customer>>> GetCustomers()
        {
            return await Mediator.Send(new List.Query());
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

    }
}
