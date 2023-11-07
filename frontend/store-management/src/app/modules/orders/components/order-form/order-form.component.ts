import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { OrderItem } from '../../models/orderItem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { CustomerService } from 'src/app/modules/customers/services/customer.service';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { SharedOrderService } from '../../services/shared-order.service';
import { MatTableDataSource } from '@angular/material/table';
import { OrderStatus } from '../../models/orderStatus';
import { OrderStatusText } from '../../models/orderStatusText';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css', '../../../shared/shared.style.css'],

})
export class OrderFormComponent implements OnInit {

  private editorderId: number | null = null

  headerText: string = 'New Order'
  orderForm: FormGroup = this.formBuilder.group({
    id: 0,
    status: 0,
    orderDate: [''],
    customerId: 0,
    customerName: [''],
    comment: '',
    totalCost: 0,
    orderItems: []
  });
  customers$ = this.customerService.getAll();
  dataSource = new MatTableDataSource<OrderItem>(this.orderForm.value.orderItems);

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedOrderService,
    private orderService: OrderService,
    private router: Router, private formBuilder: FormBuilder,
    private customerService: CustomerService,
  ) {
  }


  ngOnInit() {

    this.editorderId = this.route.snapshot.params['id'];
    if (this.editorderId) {
      this.handleEditingMode(this.editorderId);

    } else {
      this.orderForm.patchValue(this.sharedService.currentOrder);
      this.calculateTotal();
      this.headerText = 'New Order';
      this.sharedService.isEditing = false;
      this.dataSource = (this.orderForm.value.orderItems);

    }
  }


  submitForm() {
    if (this.orderForm.valid) {
      if (this.sharedService.isEditing) {
        this.orderForm.value.orderItems = this.sharedService.currentOrder.orderItems;
        this.orderForm.value.orderItems.forEach((item: OrderItem) => {
          item.productSize = Number(item.productSize);
        });
        console.log(this.orderForm.getRawValue());
        this.orderService.update(this.orderForm.getRawValue(), this.orderForm.value.id).pipe(take(1)).subscribe(() => {
          this.router.navigate(['/orders']).then(() => {
            this.sharedService.initCurrentOrder();
            this.editorderId = null;
          });
        })
      }
      else {
        const orderData = this.orderForm.getRawValue();
        orderData.status = Number(this.orderForm.value.status);
        orderData.orderDate = new Date();
        orderData.orderItems = this.sharedService.currentOrder.orderItems;
        orderData.orderItems.forEach((item: OrderItem) => {
          item.productSize = Number(item.productSize);
        });

        this.orderService.createOrder(orderData).pipe(take(1)).subscribe(() => {
          this.sharedService.initCurrentOrder();
          this.router.navigate(['/orders']);


        });
      }
    }
  }

  onAddProductClick() {
    const orderItemsControl = this.orderForm.get('orderItems');
    if (orderItemsControl) {
      orderItemsControl.setValue(this.sharedService.currentOrder.orderItems);
    }
    this.sharedService.currentOrder = this.orderForm.getRawValue();
    this.router.navigate(['/orders/add-order-item']);
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

  private calculateTotal() {
    const orderItems = this.sharedService.currentOrder.orderItems;
    const totalPrice = orderItems.reduce((total, item) => total + item.price, 0);
    this.orderForm.patchValue({ totalCost: totalPrice });
  }

  private handleEditingMode(orderId: number) {
    this.headerText = 'Edit Order';
    this.sharedService.isEditing = true;
    this.orderService.getById(orderId).pipe(take(1)).subscribe((order) => {

      this.sharedService.initCurrentOrderWithValues(order);
      this.orderForm.patchValue(this.sharedService.currentOrder);
      this.orderForm.patchValue({ customerName: order.customerName });
      this.dataSource = (this.orderForm.value.orderItems);
      this.calculateTotal();
    })

  }

}