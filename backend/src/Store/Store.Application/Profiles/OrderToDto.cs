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
    public class OrderToDto : Profile
    {
        public OrderToDto()
        {
            CreateMap<Order, OrderDto>().ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customer.FirstName + " " + src.Customer.LastName)).
                ForMember(dest => dest.CustomerAddress, opt => opt.MapFrom(src => src.Customer.Address)).ReverseMap();
        }
    }
}
