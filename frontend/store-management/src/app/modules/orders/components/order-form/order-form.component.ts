import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderItem } from '../../models/orderItem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { CustomerService } from 'src/app/modules/customers/services/customer.service';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { SharedService } from '../../services/shared.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  orderForm: FormGroup = this.formBuilder.group({
    id: 0,
    status: 0,
    orderDate: [''],
    customerId: [''],
    comment: [''],
    orderItems: []
  });

  totalCost: number = 0;
  customers$ = this.customerService.getAll();
  dataSource = new MatTableDataSource<OrderItem>(this.orderForm.value.orderItems);

  constructor(private sharedService: SharedService, private orderService: OrderService, private router: Router, private formBuilder: FormBuilder, private customerService: CustomerService, private productService: ProductService) {
  }

  ngOnInit() {
    if (this.orderForm) {
      this.orderForm.patchValue(this.sharedService.currentOrder);
      this.dataSource = (this.orderForm.value.orderItems);
      this.calculateTotalCost();
    }
  }

  submitForm() {

    if (this.orderForm.valid) {
      const ordetData = this.orderForm.getRawValue();
      ordetData.status = Number(this.orderForm.value.status);
      ordetData.orderDate = new Date();
      ordetData.orderItems = this.sharedService.currentOrder.orderItems;
      this.orderService.createOrder(ordetData).pipe(take(1)).subscribe(() => {
        this.cleanCurrentOrder();
        this.router.navigate(['/orders']);
      });
    }
  }

  onAddProductClick() {
    const orderItemsControl = this.orderForm.get('orderItems');
    if (orderItemsControl) {
      orderItemsControl.setValue(this.sharedService.currentOrder.orderItems);
    } this.sharedService.currentOrder = this.orderForm.getRawValue();
    this.router.navigate(['/add-product']);
    
  }
  calculateTotalCost():void{
    this.totalCost = this.sharedService.currentOrder.orderItems.reduce((price, item) => price + item.price, 0);
  }


  cleanCurrentOrder(): void {
    this.sharedService.currentOrder = {
      id: 0,
      status: 0,
      orderDate: new Date(),
      customerId: 0,
      comment: '',
      orderItems: []
    };
  }

  onDeleteOrderItem(orderItem : OrderItem):void{
    const index = this.sharedService.currentOrder.orderItems.indexOf(orderItem);
    if(index !== -1){
      this.sharedService.currentOrder.orderItems.splice(index, 1);
      this.dataSource.data = this.sharedService.currentOrder.orderItems;
      this.calculateTotalCost();
    }
  }
}
