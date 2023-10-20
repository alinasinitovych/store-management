using Store.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Domain.Interfaces
{
	public interface IProductRepository :  IBaseRepository<Product>
	{
        Task<IEnumerable<Category>> GetAllCategories();
        Task<string?> GetCategoryNameAsync(int? id);
    }
}
