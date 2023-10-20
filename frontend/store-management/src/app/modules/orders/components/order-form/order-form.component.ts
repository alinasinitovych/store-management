import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderItem } from '../../models/orderItem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { CustomerService } from 'src/app/modules/customers/services/customer.service';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { SharedOrderService } from '../../services/shared-order.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  orderForm: FormGroup = this.formBuilder.group({
    id: 0,
    status: '',
    orderDate: [''],
    customerId: 0,
    comment: '',
    totalCost: 0,
    orderItems: []
  });

  customers$ = this.customerService.getAll();
  dataSource = new MatTableDataSource<OrderItem>(this.orderForm.value.orderItems);

  constructor(private sharedService: SharedOrderService, private orderService: OrderService, private router: Router, private formBuilder: FormBuilder, private customerService: CustomerService, private productService: ProductService) {
  }


  ngOnInit() {
    if (this.orderForm) {
      this.orderForm.patchValue(this.sharedService.currentOrder);

      this.calculateTotal();
      this.dataSource = (this.orderForm.value.orderItems);
    }
  }
  private calculateTotal() {

    const orderItems = this.sharedService.currentOrder.orderItems;
    const totalPrice = orderItems.reduce((total, item) => total + item.price, 0);

    this.orderForm.patchValue({ totalCost: totalPrice });
  }


  submitForm() {

    if (this.orderForm.valid) {
      const ordetData = this.orderForm.getRawValue();
      ordetData.status = Number(this.orderForm.value.status);
      
      ordetData.orderDate = new Date();
      ordetData.orderItems = this.sharedService.currentOrder.orderItems;
      ordetData.orderItems.forEach((item: OrderItem) => {
        item.productSize = Number(item.productSize);
      });
      console.log(ordetData)
      this.orderService.createOrder(ordetData).pipe(take(1)).subscribe(() => {
        this.sharedService.initCurrentOrder();
        this.router.navigate(['/orders']);

      });
    }
  }

  onAddProductClick() {
    const orderItemsControl = this.orderForm.get('orderItems');
    if (orderItemsControl) {
      orderItemsControl.setValue(this.sharedService.currentOrder.orderItems);
    }
    this.sharedService.currentOrder = this.orderForm.getRawValue();
    this.router.navigate(['/add-order-item']);
  }


  onDeleteOrderItem(orderItem: OrderItem): void {
    const index = this.sharedService.currentOrder.orderItems.indexOf(orderItem);
    if (index !== -1) {
      this.sharedService.currentOrder.orderItems.splice(index, 1);
      this.dataSource.data = this.sharedService.currentOrder.orderItems;
    }
  }

  onCancelClick() {
    this.sharedService.initCurrentOrder();
    this.router.navigate(['/orders']);
  }
}
