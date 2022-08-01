using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CustomersController : BaseApiController
    {
        private readonly DataContext _context;

        public CustomersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Customer>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(Guid id)
        {
#pragma warning disable CS8604 // Possible null reference argument.
            return await _context.Customers.FindAsync(id);
#pragma warning restore CS8604 // Possible null reference argument.
        }

    }
}
