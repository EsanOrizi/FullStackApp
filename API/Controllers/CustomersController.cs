using Application.Customers;
using Domain;
using Microsoft.AspNetCore.Mvc;

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
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer(Customer customer)
        {
            return Ok(await Mediator.Send(new Create.Command { Customer = customer }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCustomer(Guid id, Customer customer)
        {
            customer.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Customer = customer }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}
