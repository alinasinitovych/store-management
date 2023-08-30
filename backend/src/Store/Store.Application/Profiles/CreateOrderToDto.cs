using AutoMapper;
using Store.Domain.Dtos;
using Store.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Application.Profiles
{
	public class CreateOrderToDto:Profile
	{
        public CreateOrderToDto()
        {
			CreateMap<Order, CreateUpdateOrderDto>().ReverseMap();
		}
    }
}
