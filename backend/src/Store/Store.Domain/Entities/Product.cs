using Store.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Domain.Entities
{
	public class Product
	{
		public int Id { get; set; }
		public string Name { get; set; }
        public int? AvailableQuantity { get; set; }
        public ProductSize? Size { get; set; }
        public decimal Price { get; set; }
		public string? Description { get; set; }
        public int? CategoryId { get; set; }
        public  DateTime CreatedDate { get; set; }
        public virtual Category Categories { get; set; }

    }
}
