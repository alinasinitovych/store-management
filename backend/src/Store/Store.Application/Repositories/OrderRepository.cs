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
            /* foreach( var oidto in order.OrderItems)
             {
                 var prod = await _context.Products.FindAsync(oidto.ProductId);
                 if (prod != null)
                 {
                     var orderItem = new OrderItem { ProductId = oidto.ProductId,
                     }
                 }
             }*/
            var createdEntity = await _context.Orders.AddAsync(order);
            var customer = await _context.Customers.FindAsync(order.CustomerId);
            if (customer != null)
            {
                customer.OrderCount++;
                customer.TotalOrderCost += order.TotalCost;
            }
            await _context.SaveChangesAsync();
            return createdEntity.Entity;
        }



    }
}
