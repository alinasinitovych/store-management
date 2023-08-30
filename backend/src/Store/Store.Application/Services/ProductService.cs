using Store.Application.Services.Interfaces;
using Store.Domain.Dtos;
using Store.Domain.Entities;
using Store.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Application.Services
{
	public class ProductService 
	{
		private readonly IProductRepository _productRepository;
		public ProductService(IProductRepository productRepository) 
		{
			_productRepository = productRepository;
		}

		public Task<ProductDto> CreateProductAsync(ProductDto productDto)
		{
			throw new NotImplementedException();
		}

		public Task DeleteProductAsync(int pdoductId)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<ProductDto>> GetAllProductsAsync()
		{
			throw new NotImplementedException();
		}

		public Task<ProductDto> GetProductByIdAsync(int productId)
		{
			throw new NotImplementedException();
		}

		public Task UpdateProductAsync(ProductDto productDto)
		{
			throw new NotImplementedException();
		}
	}
}
