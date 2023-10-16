using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Domain.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public int OrderCount { get; set; }
        public decimal TotalOrderCost { get; set; }
        public DateTime DateAdded { get; set; }
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    }
}
