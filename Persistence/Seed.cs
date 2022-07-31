using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;


namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {

        
            if (!context.Customers.Any())
            {
                var customers = new List<Customer>
                {

                new Customer { Name = "Dan", Address = "11 Harold Road", Phone = "123456" , Email = "dan@email.com"},
                new Customer { Name = "Amy", Address = "22 Hastings Road", Phone = "321654", Email = "amy@email.com"},
                new Customer { Name = "Peter", Address = "44 Denzil Avenue", Phone = "789987", Email = "peter@email.com"},
                new Customer { Name = "Sam", Address = "10 Tessa Court", Phone = "456654", Email = "sam@email.com"},
                
                };

                context.Customers.AddRange(customers);
                context.SaveChanges();
            }
          }
        }
    }
