import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { CreateOrderDto } from '../models/createOrderDto';
import { OrderItem } from '../models/orderItem';
import { GenericService } from 'src/app/services/generic.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService extends GenericService<Order> {

  constructor(http: HttpClient) {

    super(http, '/order');
  }
  public createOrder(order: CreateOrderDto): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.apiUrl}`, order);
  }
  public addOrderItem(orderItem: OrderItem): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.apiUrl}/OrderItem`, orderItem)
  }
 


}
