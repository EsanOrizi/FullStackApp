using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Repositories;

namespace TestProject
{
    public class CustomerRepositoryTests
    {
        private static DbContextOptions<DataContext> dbContextOptions = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "FullStackApp")
            .Options;

        DataContext context;
        CustomerRepository customerRepository;


        [OneTimeSetUp]
        public void Setup()
        {
            context = new DataContext(dbContextOptions);
            context.Database.EnsureCreated();
            SeedDatabase();
            customerRepository = new CustomerRepository(context);

        }


        [Test]
        public void GetAllAsync_Returns_CorrectNumberOfCustomers_Test()
        {
            var result = customerRepository.GetAllAsync();

            Assert.That(result.Result.Count, Is.EqualTo(4));
        }

        [Test]
        public void GetByIdAsync_Returns_Null_WithValidId_Test()
        {
            Guid validId = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888");
            var result = customerRepository.GetByIdAsync(validId);

            Assert.That(result.Result.Id, Is.EqualTo(validId));
            Assert.That(result.Result.Name, Is.EqualTo("Dan"));
        } 

        [Test]
        public void GetByIdAsync_Exception_WithInvalidId_Test()
        {
            Guid invalidId = Guid.Parse("08d844b0-480c-42f3-1f1b-549a5f4a2888");
                                             
            var ex = Assert.ThrowsAsync<Exception>(() => customerRepository.GetByIdAsync(invalidId));

            Assert.That(ex.Message, Is.EqualTo("Customer not found"));
        }

        [Test]    
        public void DeleteByIdAsync_WithException_InvalidId_Test()
        { 
            Guid invalidId = Guid.Parse("08d844b0-480c-42f3-1f1b-549a5f4a2888");

            var ex = Assert.ThrowsAsync<Exception>(() => customerRepository.DeleteByIdAsync(invalidId));

            Assert.That(ex.Message, Is.EqualTo("Customer not found"));
        }

        [Test]
        public void AddAsync_ValidCustomer_Test()
        {
            var customer = new Customer
            {
                Id = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2887"),
                Name = "Pam",
                Address = "11 Harold Road",
                Phone = "123456",
                Email = "dan@email.com"
            };

            var result = customerRepository.AddAsync(customer);

            Assert.That(result.IsCompletedSuccessfully, Is.True);
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