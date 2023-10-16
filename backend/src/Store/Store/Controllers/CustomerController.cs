using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Store.Application.Services;
using Store.Application.Services.Interfaces;
using Store.Domain.Dtos;
using Store.Domain.Entities;

namespace Store.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;
        private readonly IMapper _mapper;

        public CustomerController(ICustomerService customerService, IMapper mapper)
        {
            _customerService = customerService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetById(int id)
        {
            var customerDto = await _customerService.GetById(id);
            if (customerDto == null)
            {
                return NotFound();
            }
            return Ok(customerDto);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetAll()
        {
            var customers = await _customerService.GetAll();
            return Ok(customers);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            await _customerService.Delete(id);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update(CustomerDto customer)
        {
            await _customerService.Update(customer);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CustomerDto customer,
            [FromServices] IValidator<CustomerDto> validator)
        {
            await _customerService.Create(customer);
            return Ok();
        }
    }
}
