using FluentValidation.Results;
using Store.Domain.Dtos;
using Store.Domain.Entities;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Application.Services.Interfaces
{
	public interface IOrderService
	{
		Task<OrderDto> CreateOrderAsync(CreateUpdateOrderDto orderDto);
		Task UpdateOrderAsync(CreateUpdateOrderDto orderDto);
		Task DeleteOrderAsync(int orderId);
		Task<IEnumerable<OrderDto>> GetAllOrdersAsync();
		Task<OrderDto> GetOrderByIdAsync(int orderId);
		Task<IEnumerable<OrderItemDto>> GetOrderItemsByOrderId(int orderId);
		Task<OrderItem> AddOrderItemAsync(int orderId, OrderItem orderItem);
		ValidationResult ValidateOrder(CreateUpdateOrderDto orderDto);

	}
}
