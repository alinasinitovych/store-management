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
            var validationResult = _orderService.ValidateOrder(order);

            if (!validationResult.IsValid)
            {
                var validationErrors = validationResult.Errors
                    .Select(error => new { Property = error.PropertyName, Message = error.ErrorMessage })
                    .ToList();

                return BadRequest(validationErrors);
            }
            await _orderService.Update(order);
            return Ok();
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateUpdateOrderDto order)
        {
            var validationResult = _orderService.ValidateOrder(order);

            if (!validationResult.IsValid)
            {
                var validationErrors = validationResult.Errors
                    .Select(error => new { Property = error.PropertyName, Message = error.ErrorMessage })
                    .ToList();

                return BadRequest(validationErrors);
            }
            await _orderService.Create(order);
            return Ok();
        }

        [HttpGet("{orderId}/orderitems")]
        public async Task<ActionResult<IEnumerable<OrderItemDto>>> GetOrderItems(int orderId)
        {
            var orderItems = await _orderService.GetOrderItemsByOrderId(orderId);
            return Ok(orderItems);
        }

        [HttpPost("{orderId}/orderitems")]
        public async Task<IActionResult> AddOrderItem(int orderId, OrderItemDto orderItemDto)
        {
            var orderItem = _mapper.Map<OrderItem>(orderItemDto);
            await _orderService.AddOrderItem(orderId, orderItem);
            return Ok();
        }

    }
}
