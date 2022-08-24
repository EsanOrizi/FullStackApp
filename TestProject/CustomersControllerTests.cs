using API.Controllers;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Persistence;
using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject
{
    public class CustomersControllerTests
    {
        private static DbContextOptions<DataContext> dbContextOptions = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "FullStackAppController")
            .Options;


        DataContext context;
        CustomersController customersController;
        UnitOfWork unitOfWork;
        IMapper mapper;

    
        [OneTimeSetUp]
        public void Setup()
        {
            context = new DataContext(dbContextOptions);
            context.Database.EnsureCreated();
            SeedDatabase();
            mapper = new Mock<IMapper>().Object;
            unitOfWork = new UnitOfWork(context);
            customersController = new CustomersController(unitOfWork, mapper);
        }


        [Test, Order(1)]
        public void HTTPGET_GetCustomers_ReturnsOK_Test()
        {
            IActionResult actionResult = customersController.GetCustomers().Result.Result;

            Assert.That(actionResult, Is.TypeOf<OkObjectResult>());

            var actionResultData = (actionResult as OkObjectResult).Value as List<Customer>;

            Assert.That(actionResultData.First().Name, Is.EqualTo("Dan"));
            Assert.That(actionResultData.Count(), Is.EqualTo(4));
        }


        [Test, Order(2)]
        public void HTTPGET_GetCustomer_ValidId_RetrunsOK_Test()
        {
            Guid validId = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888");

            IActionResult actionResult = customersController.GetCustomer(validId).Result.Result;

            Assert.That(actionResult, Is.TypeOf<OkObjectResult>());

            var actionResultData = (actionResult as OkObjectResult).Value as Customer;

            Assert.That(actionResultData.Id, Is.EqualTo(validId));
            Assert.That(actionResultData.Name, Is.EqualTo("Dan"));

        }

        [Test, Order(3)]
        public void HTTPGET_GetCustomer_InvalidId_ReturnsNotFound_Test()
        {
            var customersController = new CustomersController(unitOfWork, mapper);
            Guid invalidId = Guid.Parse("08d844b0-480c-42f3-1f1b-549a5f4a2888");

            IActionResult actionResult = customersController.GetCustomer(invalidId).Result.Result;

            Assert.That(actionResult, Is.TypeOf<NotFoundResult>());
        }

        [Test, Order(4)]
        public void HTTPPOST_CreateCustomer_ReturnsCreatedResult_Test()
        {
            var newCustomer = new Customer
            {
                Id = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2887"),
                Name = "Pam",
                Address = "11 Harold Road",
                Phone = "123456",
                Email = "",
            };

            IActionResult actionResult = customersController.CreateCustomer(newCustomer).Result;

            Assert.That(actionResult, Is.TypeOf<CreatedResult>());
           
            var actionResultData = (actionResult as CreatedResult).Value as Customer;

            Assert.That(actionResultData, Is.Not.Null);
            Assert.That(actionResultData.Name, Is.EqualTo("Pam"));
        }



        [Test, Order(5)]
        public void HTTPPUT_EditCustomer_ReturnsEditedCustomerAndCreatedResult_Test()
        {
            var customer = new Customer
            {
                Id = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888"),
                Name = "Dan EDITED",
                Address = "11 Harold Road",
                Phone = "44444",
                Email = "dan@email.com"
            
            };
                       
            IActionResult actionResult = customersController.EditCustomer(customer.Id, customer).Result;

            Assert.That(actionResult, Is.TypeOf<CreatedResult>());

            var actionResultData = (actionResult as CreatedResult).Value as Customer;

           Assert.That(actionResultData, Is.Not.Null);
           Assert.That(actionResultData.Name, Is.EqualTo("Dan EDITED"));
           Assert.That(actionResultData.Phone, Is.EqualTo("44444"));
        }


        [Test, Order(6)]
        public void HTTPDELETE_DeleteCustomer_ReturnsOk_Test()
        {
            Guid validId = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888");

            var actionResult = customersController.DeleteCustomer(validId).Result;

            Assert.That(actionResult, Is.TypeOf<OkResult>());
        }

        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var customers = new List<Customer>
                {
                new Customer { Id = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888"),
                               Name = "Dan",
                               Address = "11 Harold Road",
                               Phone = "123456",
                               Email = "dan@email.com"},

                new Customer { Id = Guid.Parse("1D0CB237-B440-460A-87B5-5FAE784E1EB9"),
                               Name = "Amy",
                               Address = "22 Hastings Road",
                               Phone = "321654",
                               Email = "amy@email.com"},

                new Customer { Id = Guid.Parse("D7A3CDF6-E59C-454B-B527-DC833ABFD13A"),
                               Name = "Peter",
                               Address = "44 Denzil Avenue",
                               Phone = "789987",
                               Email = "peter@email.com"},

                new Customer { Id = Guid.Parse("F2F9390C-9633-4E0F-8F03-946731523F28"),
                               Name = "Sam",
                               Address = "10 Tessa Court",
                               Phone = "456654",
                               Email = "sam@email.com"},
                };
            context.Customers.AddRange(customers);
            context.SaveChanges();
        }
    }
}
