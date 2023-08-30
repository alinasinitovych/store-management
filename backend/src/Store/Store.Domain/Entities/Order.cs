using Store.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Domain.Entities
{
	public class Order
	{
        public int Id { get; set; }
		[Required]
        public int CustomerId { get; set; }
		
		public OrderStatus Status { get; set; }
        public decimal TotalCost { get; set; }
		public DateTime OrderDate { get; set; } = DateTime.Now;

		public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

		[ForeignKey("CustomerId")]
		public Customer? Customer { get; set; }
        public string? Comment { get; set; }

    }
}
