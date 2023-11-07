import { Injectable } from '@angular/core';
import { CreateOrderDto } from '../models/createOrderDto';
import { Order } from '../models/order';
import { OrderItem } from '../models/orderItem';

@Injectable({
  providedIn: 'root'
})
export class SharedOrderService {
  
  currentOrder!: CreateOrderDto;
  isEditing = false;
  newOrderItems: OrderItem[] = []
  constructor() {
    this.initCurrentOrder();
  }
  initCurrentOrder() {
    this.currentOrder = {
      id: 0,
      status: 0,
      orderDate: new Date(),
      customerId: 0,
      comment: '',
      orderItems: []
    };
    this.newOrderItems = []
  }
  initCurrentOrderWithValues(order: Order) {
    this.currentOrder = {
      id: order.id,
      status: order.status,
      orderDate: order.orderDate,
      customerId: order.customerId,
      comment: order.comment,
      orderItems: [...order.orderItems, ...this.newOrderItems]
    };

  }
}


