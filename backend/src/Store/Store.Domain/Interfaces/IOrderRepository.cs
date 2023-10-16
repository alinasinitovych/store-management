using Store.Domain.Dtos;
using Store.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Store.Domain.Interfaces
{
	public interface IOrderRepository : IBaseRepository<Order>
	{
		Task<IEnumerable<Order>> GetAllIncluding();
		Task<Order> GetOrderByIdIncluding(int id);

	}
}
