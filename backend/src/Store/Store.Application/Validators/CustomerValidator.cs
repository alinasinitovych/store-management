using FluentValidation;
using Store.Domain.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Application.Validators
{
    public class CustomerValidator : AbstractValidator<CustomerDto>
    {
        public CustomerValidator()
        {


            RuleFor(customer => customer.FirstName)
                .NotEmpty().WithMessage("First Name is required.")
                .MaximumLength(50).WithMessage("First Name cannot exceed 50 characters.");

            RuleFor(customer => customer.LastName)
                .NotEmpty().WithMessage("Last Name is required.")
                .MaximumLength(50).WithMessage("Last Name cannot exceed 50 characters.");

            RuleFor(customer => customer.Address)
                .NotEmpty().WithMessage("Address is required.")
                .MaximumLength(100).WithMessage("Address cannot exceed 100 characters.");

            RuleFor(customer => customer.OrderCount)
                .GreaterThanOrEqualTo(0).WithMessage("Order Count must be greater than or equal to 0.");

            RuleFor(customer => customer.TotalOrderCost)
                .GreaterThanOrEqualTo(0).WithMessage("Total Order Cost must be greater than or equal to 0.");

            RuleFor(customer => customer.DateAdded)
                .NotEmpty().WithMessage("Date Added is required.")
                .LessThanOrEqualTo(DateTime.Now).WithMessage("Date Added cannot be in the future.");
        }
    }
}

