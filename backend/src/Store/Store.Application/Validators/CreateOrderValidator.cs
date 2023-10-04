using FluentValidation;
using Store.Domain.Dtos;
using Store.Domain.Entities;

namespace Store.API.Validators
{
    public class CreateOrderValidator : AbstractValidator<CreateUpdateOrderDto>
    {
        public CreateOrderValidator()
        {
            RuleFor(dto => dto.CustomerId)
            .NotNull().WithMessage("Customer ID is required.")
            .GreaterThanOrEqualTo(0).WithMessage("Invalid customer ID.");

            RuleFor(dto => dto.Status)
                .IsInEnum().WithMessage("Invalid order status.");

            RuleForEach(dto => dto.OrderItems).SetValidator(new OrderItemValidator());
        }
    }
}
