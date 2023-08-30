using Microsoft.EntityFrameworkCore;
using Store.Domain.Dtos;
using Store.Domain.Entities;
using Store.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Infrustracture
{
	public class OrderRepository : BaseRepository<Order>, IOrderRepository
	{
		public OrderRepository(StoreDbContext appContext) : base(appContext)
		{
		}

		public async Task<OrderItem?> AddOrderItemAsync(int orderId, OrderItem orderItem)
		{
			var order = await _context.Orders.FindAsync(orderId);
			


			orderItem.OrderId = orderId;
			_context.OrderItems.Add(orderItem);
			await _context.SaveChangesAsync();

			return orderItem;
		}

		public async Task<IEnumerable<OrderItem>> GetOrderItemsByOrderId(int orderId)
		{
			var orderItems = await _context.OrderItems.Where(order => order.OrderId == orderId).ToListAsync();
			return orderItems;
		}
		public async Task<IEnumerable<Order>> GetAllIncluding()
		{
			var ordersWithCustomers = await _context.Orders.Include(o => o.Customer).ToListAsync();
			return ordersWithCustomers;
		}
		public async Task<Order> GetOrderByIdIncluding(int id)
		{
			var orderWithCustomer = await _context.Orders.Include(o => o.Customer).Where(o=> o.Id == id).FirstOrDefaultAsync();
			
			return orderWithCustomer;
		}



	}
}
