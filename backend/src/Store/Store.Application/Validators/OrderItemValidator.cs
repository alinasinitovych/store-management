using FluentValidation;
using Store.Domain.Dtos;
using Store.Domain.Entities;

namespace Store.API.Validators
{
    public class OrderItemValidator : AbstractValidator<OrderItemDto>
    {
        public OrderItemValidator()
        {
            RuleFor(orderItem => orderItem.ProductId)
                .GreaterThanOrEqualTo(0).NotNull().WithMessage("Product Id is not valid.");

            RuleFor(orderItem => orderItem.Quantity)
                .GreaterThan(0).WithMessage("Quantity must be greater than zero.");
        }
    }
}
