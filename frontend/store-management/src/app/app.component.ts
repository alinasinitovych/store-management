import { Component } from '@angular/core';
import { OrderStatus } from './models/orders/order';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store-management';
  orderStatus = OrderStatus; 
}
