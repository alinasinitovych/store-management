import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/customers/customer';
import { CreateOrderDto } from 'src/app/models/orders/createOrderDto';
import { OrderItem } from 'src/app/models/orders/orderItem';
import { Order } from 'src/app/models/orders/order';
import { Product } from 'src/app/models/products/product';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css', '../../../../app.component.css']
})
export class OrderFormComponent implements OnInit {

  order: CreateOrderDto = {
    id: 0,
    status: 0,
    orderDate: new Date(),
    customerId: 0,
    customerAddress: '',
    comment: '',
    orderItems: []
  };
  orderItems: OrderItem[] = [];
  customers: Customer[] = [];
  products: Product[] = [];
  totalCost: number = 0;
  displayedColumns: string[] = ['productId', 'productName', 'productCategory', 'productSize', 'productQuantity', 'productPrice'];
  @ViewChild('orderForm') orderForm!: NgForm;
  selectedCustomerId: number = 0;
  constructor(private orderService: OrderService, private router: Router) { }

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
    this.customers = [{
      id: 1,
      name: 'Customer A',
      address: 'Address A',
      ordersCount: 5,
      totalOrderedCost: 500,
      createdDate: new Date()
    },
    {
      id: 2,
      name: 'Customer B',
      address: 'Address B',
      ordersCount: 10,
      totalOrderedCost: 1000,
      createdDate: new Date()
    },
    {
      id: 3,
      name: 'Customer C',
      address: 'Address C',
      ordersCount: 3,
      totalOrderedCost: 300,
      createdDate: new Date()
    }]
  }
  submitForm() {
    
    if (this.orderForm.valid) {
      
      const selectedCustomer = this.customers.find(customer => customer.id == this.orderForm.value.customerId);
      console.log(selectedCustomer);
      if (selectedCustomer) {

        this.order.customerId = this.orderForm.value.customerId;
        this.order.customerAddress = selectedCustomer.address;

        this.order.status = Number(this.order.status);
        this.order.orderItems = [
          { id: 0, productId: 1, quantity: 8 }
        ];

        this.orderService.createOrder(this.order).subscribe(() => {
          this.router.navigate(['/orders']);
        });

      }
    }
  }
}
