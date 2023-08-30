import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, CreateOrderDto, OrderItem } from '../models/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://localhost:7181/api/order'; // Update with your API URL

  constructor(private http: HttpClient) {}

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
  createOrder(order: CreateOrderDto): Observable<any> {
    console.log(order);
    console.log(`${this.apiUrl}/create`);
    return this.http.post(`${this.apiUrl}/create`, order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateOrder(order: Order): Observable<any> {
    return this.http.post(`${this.apiUrl}/update`, order);
  }

  getOrderItems(orderId: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/${orderId}/orderitems`);
  }

  addOrderItem(orderId: number, orderItem: OrderItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/orderitems`, orderItem);
  }
}
