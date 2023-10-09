using AutoMapper;
using Store.Application.Profiles;
using Store.Application.Repositories;
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
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;

        public CustomerService(ICustomerRepository customerRepository, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
        }

        public async Task<CustomerDto> Create(CustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);
            var createdCustomer = await _customerRepository.AddAsync(customer);
            return _mapper.Map<CustomerDto>(createdCustomer);
        }

        public async Task Delete(int customerId)
        {
            var customerToDelete = await _customerRepository.GetByIdAsync(customerId);
            if (customerToDelete != null)
            {
                await _customerRepository.DeleteAsync(customerToDelete);
            }
        }

        public async Task<IEnumerable<CustomerDto>> GetAll()
        {
            var allCustomers = await _customerRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CustomerDto>>(allCustomers);
        }

        public async Task<CustomerDto> GetById(int customerId)
        {
            var prodoct = await _customerRepository.GetByIdAsync(customerId);
            return _mapper.Map<CustomerDto>(prodoct);
        }

        public async Task Update(CustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);
            await _customerRepository.UpdateAsync(customer);
        }
    }
}
