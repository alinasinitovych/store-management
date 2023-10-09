import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/orders/order';
import { CreateOrderDto } from 'src/app/models/orders/createOrderDto';
import { OrderItem } from 'src/app/models/orders/orderItem';
import { GenericService } from 'src/app/services/generic.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService extends GenericService<Order> {
  
  
  constructor(http: HttpClient) {
    super(http,'https:/localhost:7181/api/order' ); 
    
  }
  public createOrder(order: CreateOrderDto): Observable<any> {
    console.log(order);
    console.log(`${this.apiUrl}/create`);
    return this.http.post(`${this.apiUrl}/create`, order);
  }
// getOrderById(id: number): Observable<Order> {
  //   return this.http.get<Order>(`${this.apiUrl}/${id}`);
  // }

  // getAllOrders(): Observable<Order[]> {
  //   return this.http.get<Order[]>(this.apiUrl);
  // }
  // deleteOrder(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }

  // updateOrder(order: Order): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/update`, order);
  // }

  // getOrderItems(orderId: number): Observable<OrderItem[]> {
  //   return this._http.get<OrderItem[]>(`${this.apiUrl}/${orderId}/orderitems`);
  // }

  // addOrderItem(orderId: number, orderItem: OrderItem): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/${orderId}/orderitems`, orderItem);
  // }
}
