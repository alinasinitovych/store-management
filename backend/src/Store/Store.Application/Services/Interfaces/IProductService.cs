using Store.Domain.Dtos;
using Store.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Application.Services.Interfaces
{
	public interface IProductService
	{
		Task<ProductDto> CreateProductAsync(ProductDto productDto);
		Task UpdateProductAsync(ProductDto productDto);
		Task DeleteProductAsync(int pdoductId);
		Task<IEnumerable<ProductDto>> GetAllProductsAsync();
		Task<ProductDto> GetProductByIdAsync(int productId);
	}
}
