using Store.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Domain.Dtos
{
	public class CreateUpdateOrderDto
	{
		public int Id { get; set; }
		public OrderStatus Status { get; set; }
		public DateTime OrderDate { get; set; }
        public int CustomerId { get; set; }
		public string CustomerAddress { get; set; }
		public string? Comment { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
	}
}
