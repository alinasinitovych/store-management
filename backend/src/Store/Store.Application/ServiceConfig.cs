using FluentValidation;
using Store.API.Validators;
using Store.Application.Profiles;
using Store.Application.Services.Interfaces;
using Store.Application.Services;
using Store.Domain.Dtos;
using Store.Domain.Interfaces;
using Store.Infrustracture;
using Microsoft.Extensions.DependencyInjection;
using Store.Application.Repositories;
using Store.Application.Validators;

namespace Store.API
{
    public static class ServiceConfig
    {
        public static void AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderService, OrderService>();

            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IProductService, ProductService>();

            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<ICustomerService, CustomerService>();

            services.AddScoped<IOrderItemRepository, OrderItemRepository>();
            services.AddAutoMapper(typeof(OrderToDto));

        }
    }
}
