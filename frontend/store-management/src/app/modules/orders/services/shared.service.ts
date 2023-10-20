import { Injectable } from '@angular/core';
import { CreateOrderDto } from '../models/createOrderDto';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentOrder!: CreateOrderDto;
  constructor() {
    this.initCurrentOrder();
   }
   initCurrentOrder(){
    this.currentOrder =  {
      id:0,
      status:0,
      orderDate: new Date() ,
      customerId: 0,    
      comment:'',
      
      orderItems: []
    };
   }
}
