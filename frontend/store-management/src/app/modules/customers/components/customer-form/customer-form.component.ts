import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css', '../../../shared/shared.style.css']
})
export class CustomerFormComponent {

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private router: Router) {

  }
  customerForm: FormGroup = this.formBuilder.group({
    id: 0,
    firstName: [''],
    lastName: [''],
    address: [''],
    orderCount: 0,
    totalOrderCost: 0,
    dateAdded: new Date()
  })
  submitForm() {
    if (this.customerForm.valid) {
      this.customerService.create(this.customerForm.getRawValue()).pipe(take(1)).subscribe(() => {
        this.router.navigate(['/customers']);

      });

    }
  }
}