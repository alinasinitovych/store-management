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
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateUpdateOrderDto> _validator;
        public OrderService(IOrderRepository orderRepository, IOrderItemRepository orderItemRepository, IMapper mapper, IValidator<CreateUpdateOrderDto> validator, IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _orderItemRepository = orderItemRepository;
            _mapper = mapper;

            _validator = validator;
            _productRepository = productRepository;
        }

        public async Task<OrderDto> Create(CreateUpdateOrderDto orderDto)
        {
            var order = _mapper.Map<Order>(orderDto);

            order.OrderDate = DateTime.Now;
            order.Customer = null;
            foreach (var orderItem in order.OrderItems)
            {
                orderItem.Product = await _productRepository.GetByIdAsync(orderItem.ProductId);
            }

            var createdOrder = await _orderRepository.CreateOrderWithCustomerUpdate(order);
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
            var orderDto = _mapper.Map<OrderDto>(order);
            foreach (var orderItemDto in orderDto.OrderItems)
            {
                orderItemDto.ProductName = order.OrderItems
                    .FirstOrDefault(oi => oi.Id == orderItemDto.Id)
                    ?.Product?.Name;

                orderItemDto.ProductCategory = order.OrderItems
                    .FirstOrDefault(oi => oi.Id == orderItemDto.Id)
                    ?.Product?.Categories?.Name;
            }
            return orderDto;
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



    }
}
