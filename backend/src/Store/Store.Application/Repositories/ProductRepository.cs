using Microsoft.EntityFrameworkCore;
using Store.Domain.Entities;
using Store.Domain.Interfaces;
using Store.Infrustracture;
using Store.Infrustracture.Migrations;
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

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _context.Categories.ToListAsync();
        }
        public async Task<string?> GetCategoryNameAsync(int? id)
        {
            if (id != null)
            {
                string categoryName = _context.Categories
                .Where(category => category.Id == id)
                .Select(category => category.Name)
                .FirstOrDefault();
                return categoryName;
            }
            return null;
        }
    }
}
