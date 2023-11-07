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
        public async Task<IEnumerable<Order>> GetAllIncluding()
        {
            var ordersWithCustomers = await _context.Orders.Include(o => o.Customer).ToListAsync();
            return ordersWithCustomers;
        }
        public async Task<Order> GetOrderByIdIncluding(int id)
        {
            var orderWithCustomer = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ThenInclude(p => p.Categories)
                .Where(o => o.Id == id).FirstOrDefaultAsync();
            return orderWithCustomer;
        }
        public async Task<Order> CreateOrderWithCustomerUpdate(Order order)
        {
            
            var createdEntity = await _context.Orders.AddAsync(order);
            var customer = await _context.Customers.FindAsync(order.CustomerId);

            
            if (customer != null)
            {
                customer.OrderCount++;
                customer.TotalOrderCost += order.TotalCost;
            }
            foreach(var orderItem in order.OrderItems)
            {
                var product = await _context.Products.FindAsync(orderItem.ProductId);
                if (product != null)
                {
                    if(orderItem.Quantity <= product.AvailableQuantity)
                    {
                        product.AvailableQuantity -= orderItem.Quantity;

                    }
                    else
                    {
                        throw new Exception("Ordered quantity is more than available quantity");
                    }
                }
            }
            await _context.SaveChangesAsync();
            return createdEntity.Entity;
        }
        public async Task<Order> GetOrderWithProductsAsync(int orderId)
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }



    }
}
