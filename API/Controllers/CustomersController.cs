using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CustomersController : BaseApiController
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public CustomersController(IUnitOfWork unitOfWork,IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Customer>>> GetCustomers()
        {
         
            var customers = await unitOfWork.CustomerRepository.GetAllAsync();
            return Ok(customers);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(Guid id)
        {
            try
            {
                var customer = await unitOfWork.CustomerRepository.GetByIdAsync(id);
                if (customer != null)
                {
                    return Ok(customer);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex) { return NotFound(); }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer(Customer customer)
        {

            var newCustomer = new Customer();
            mapper.Map(customer, newCustomer);
            await unitOfWork.CustomerRepository.AddAsync(customer);
            var result = await unitOfWork.Complete();
            if (result <= 0) return null;
            return Created(nameof(CreateCustomer), customer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCustomer(Guid id, Customer customer)
        {
            var existingCustomer = await unitOfWork.CustomerRepository.GetByIdAsync(id);
            mapper.Map(customer, existingCustomer);
            await unitOfWork.CustomerRepository.UpdateAsync(customer);
            var result = await unitOfWork.Complete();
            if (result <= 0) return null;
            return Created(nameof(CreateCustomer), customer);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            await unitOfWork.CustomerRepository.DeleteByIdAsync(id);
            var result = await unitOfWork.Complete();
            if (result <= 0) NotFound();
            return Ok();
        }

    }
}
