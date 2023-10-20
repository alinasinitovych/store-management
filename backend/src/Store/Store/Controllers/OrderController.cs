using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Store.Application.Services.Interfaces;
using Store.Domain.Dtos;
using Store.Domain.Entities;


namespace Store.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrderController(IOrderService productService, IMapper mapper)
        {
            _orderService = productService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetById(int id)
        {
            var orderDto = await _orderService.GetById(id);
            if (orderDto == null)
            {
                return NotFound();
            }
            return Ok(orderDto);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAll()
        {
            var orders = await _orderService.GetAll();
            return Ok(orders);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            await _orderService.Delete(id);
            return Ok();
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update(CreateUpdateOrderDto order)
        {

            await _orderService.Update(order);
            return Ok();
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateUpdateOrderDto order)
        {
            await _orderService.Create(order);
            return Ok();
        }



    }
}
