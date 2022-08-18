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
            return await unitOfWork.CustomerRepository.GetAllAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(Guid id)
        {
            return await unitOfWork.CustomerRepository.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer(Customer customer)
        {

            var newCustomer = new Customer();
            mapper.Map(customer, newCustomer);
            await unitOfWork.CustomerRepository.AddAsync(customer);
            var result = await unitOfWork.Complete();
            if (result <= 0) return null;
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCustomer(Guid id, Customer customer)
        {
            var existingCustomer = await unitOfWork.CustomerRepository.GetByIdAsync(id);
            mapper.Map(customer, existingCustomer);
            var result = await unitOfWork.Complete();
            if (result <= 0) return null;
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            await unitOfWork.CustomerRepository.DeleteByIdAsync(id);
            var result = await unitOfWork.Complete();
            if (result <= 0) return null;
            return Ok();


        }

    }
}
