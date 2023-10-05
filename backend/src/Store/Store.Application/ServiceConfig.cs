using FluentValidation;
using Store.API.Validators;
using Store.Application.Profiles;
using Store.Application.Services.Interfaces;
using Store.Application.Services;
using Store.Domain.Dtos;
using Store.Domain.Interfaces;
using Store.Infrustracture;
using Microsoft.Extensions.DependencyInjection;

namespace Store.API
{
    public static class ServiceConfig
    {
        public static void AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IValidator<CreateUpdateOrderDto>, CreateOrderValidator>();
            services.AddScoped<IOrderItemRepository, OrderItemRepository>();
            services.AddAutoMapper(typeof(OrderToDto));

        }
    }
}
