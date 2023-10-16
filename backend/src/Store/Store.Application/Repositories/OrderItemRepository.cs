using Microsoft.EntityFrameworkCore;
using Store.Domain.Entities;
using Store.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Infrustracture
{
    public class OrderItemRepository : BaseRepository<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepository(StoreDbContext appContext) : base(appContext)
        {
        }
        public async Task<OrderItem> Add(int orderId, OrderItem orderItem)
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
    }
}
