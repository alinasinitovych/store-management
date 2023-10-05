using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
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
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateUpdateOrderDto> _validator;
        public OrderService(IOrderRepository orderRepository, IOrderItemRepository orderItemRepository, IMapper mapper, IValidator<CreateUpdateOrderDto> validator)
        {
            _orderRepository = orderRepository;
            _orderItemRepository = orderItemRepository;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<OrderDto> Create(CreateUpdateOrderDto orderDto)
        {
            var order = _mapper.Map<Order>(orderDto);
            order.TotalCost = CalculateTotalCost(order);
            order.OrderDate = DateTime.Now;
            order.Customer = null;
            var createdOrder = await _orderRepository.AddAsync(order);
            return _mapper.Map<OrderDto>(createdOrder);
        }

        public async Task Delete(int orderId)
        {
            var orderToDelete = await _orderRepository.GetByIdAsync(orderId);
            if (orderToDelete != null)
            {
                await _orderRepository.DeleteAsync(orderToDelete);
            }
        }

        public async Task<IEnumerable<OrderDto>> GetAll()
        {
            var allOrders = await _orderRepository.GetAllIncluding();


            return _mapper.Map<IEnumerable<OrderDto>>(allOrders);
        }

        public async Task<OrderDto> GetById(int orderId)
        {
            var order = await _orderRepository.GetOrderByIdIncluding(orderId);


            return _mapper.Map<OrderDto>(order);
        }

        public async Task<IEnumerable<OrderItemDto>> GetOrderItemsByOrderId(int orderId)
        {
            var orders = await _orderItemRepository.GetOrderItemsByOrderId(orderId);
            return _mapper.Map<IEnumerable<OrderItemDto>>(orders);
        }
        public async Task<OrderItem> AddOrderItem(int orderId, OrderItem orderItem)
        {
            await _orderItemRepository.Add(orderId, orderItem);
            return orderItem;
        }
        public async Task Update(CreateUpdateOrderDto orderDto)
        {
            var order = _mapper.Map<Order>(orderDto);
            await _orderRepository.UpdateAsync(order);
        }

        //TODO: Finish calculateMethod
        private static decimal CalculateTotalCost(Order order)
        {
            return order.OrderItems.Sum(item => item.Quantity);
        }

        public ValidationResult ValidateOrder(CreateUpdateOrderDto orderDto)
        {
            return _validator.Validate(orderDto);
        }
    }
}
