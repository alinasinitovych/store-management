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
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(StoreDbContext appContext) : base(appContext)
        {
        }
    }
}
