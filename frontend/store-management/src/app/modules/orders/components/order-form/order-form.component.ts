import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/modules/customers/models/customer';
import { CreateOrderDto } from '../../models/createOrderDto';
import { OrderItem } from '../../models/orderItem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Product } from 'src/app/modules/products/models/product';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { CustomerService } from 'src/app/modules/customers/services/customer.service';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css', '../../../../app.component.css']
})
export class OrderFormComponent implements OnInit {

  orderForm: FormGroup = this.formBuilder.group({
    status: [''],
    customerId: [''],
    comment: [''],
    orderItems: ['']
  });
  totalCost: number = 0;
  customers: Customer[] = [];
  products: Product[] = [];
  displayedColumns: string[] = ['productId', 'productName', 'productCategory', 'productSize', 'productQuantity', 'productPrice'];
  orderResult$!: Observable<CreateOrderDto[]>;

  constructor(private orderService: OrderService, private router: Router, private formBuilder: FormBuilder, private customerService: CustomerService) {
  }

  ngOnInit() {
    // for visualization
    this.products = [
      {
        id: 1,
        name: 'Product 1',
        availableQuantity: 10,
        size: 100,
        price: 50.0,
        description: 'Description for Product 1',
        categoryId: 1,
        createdDate: new Date()
      },
      {
        id: 2,
        name: 'Product 2',
        availableQuantity: 15,
        size: 150,
        price: 75.0,
        description: 'Description for Product 2',
        categoryId: 2,
        createdDate: new Date()
      },
      {
        id: 3,
        name: 'Product 3',
        availableQuantity: 20,
        size: 200,
        price: 100.0,
        description: 'Description for Product 3',
        categoryId: 1,
        createdDate: new Date()
      }
    ];

    this.customerService.getAll().subscribe((customers: Customer[]) => {
      this.customers = customers;
      console.log(this.customers)
    });
  }
  submitForm() {

    if (this.orderForm.valid) {

      const order: CreateOrderDto = {
        id: 0,
        status: Number(this.orderForm.value.status),
        orderDate: new Date(),
        customerId: this.orderForm.value.customerId,
        comment: this.orderForm.value.comment,
        orderItems: [
          { id: 0, productId: 3, quantity: 8 }
        ]
      };

      this.orderService.createOrder(order).pipe(take(1)).subscribe(() => {
        this.router.navigate(['/orders']);
      });


    }
  }
}
