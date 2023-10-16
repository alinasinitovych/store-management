using Store.Domain.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Application.Services.Interfaces
{
    public interface ICustomerService
    {
        Task<CustomerDto> Create(CustomerDto customerDto);
        Task Update(CustomerDto customerDto);
        Task Delete(int customerId);
        Task<IEnumerable<CustomerDto>> GetAll();
        Task<CustomerDto> GetById(int customerId);
    }
}
