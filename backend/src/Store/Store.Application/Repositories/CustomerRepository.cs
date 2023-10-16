using Store.Domain.Entities;
using Store.Domain.Interfaces;
using Store.Infrustracture;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Application.Repositories
{
    public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
    {
        public CustomerRepository(StoreDbContext appContext) : base(appContext)
        {
        }
    }
}
