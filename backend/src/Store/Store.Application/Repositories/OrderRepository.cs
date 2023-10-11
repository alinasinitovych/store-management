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
            var orderWithCustomer = await _context.Orders.Include(o => o.Customer).Where(o => o.Id == id).FirstOrDefaultAsync();
            return orderWithCustomer;
        }



    }
}
