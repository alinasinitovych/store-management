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
        Task<ProductDto> Create(ProductDto productDto);
        Task Update(ProductDto productDto);
        Task Delete(int pdoductId);
        Task<IEnumerable<ProductDto>> GetAll();
        Task<ProductDto> GetById(int productId);
    }
}
