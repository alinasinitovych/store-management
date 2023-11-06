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
        Task<OrderDto> Create(CreateUpdateOrderDto orderDto);
        Task Update(CreateUpdateOrderDto orderDto);
        Task Delete(int orderId);
        Task<IEnumerable<OrderDto>> GetAll();
        Task<OrderDto> GetById(int orderId);
        Task<IEnumerable<OrderItemDto>> GetOrderItemsByOrderId(int orderId);
        Task<OrderItem> AddOrderItem( OrderItemDto orderItem);

    }
}
