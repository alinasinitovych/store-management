using AutoMapper;
using FluentValidation;
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
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<ProductDto> Create(ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            var createdProduct = await _productRepository.AddAsync(product);
            return _mapper.Map<ProductDto>(createdProduct);
        }

        public async Task Delete(int pdoductId)
        {
            var prodoctToDelete = await _productRepository.GetByIdAsync(pdoductId);
            if (prodoctToDelete != null)
            {
                await _productRepository.DeleteAsync(prodoctToDelete);
            }
        }

        public async Task<IEnumerable<ProductDto>> GetAll()
        {
            var allProducts = await _productRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ProductDto>>(allProducts);
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            var allCategories = await _productRepository.GetAllCategories();
            return _mapper.Map<IEnumerable<Category>>(allCategories);
        }

        public async Task<ProductDto> GetById(int productId)
        {
            var prodoct = await _productRepository.GetByIdAsync(productId);
            return _mapper.Map<ProductDto>(prodoct);
        }

        public async Task Update(ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            await _productRepository.UpdateAsync(product);

        }
    }
}
