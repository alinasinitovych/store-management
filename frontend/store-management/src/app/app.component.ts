import { Component } from '@angular/core';
import { OrderStatus as OrderStatus } from './models/orders/orderStatus';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store-management';
  orderStatus = OrderStatus; 
}
