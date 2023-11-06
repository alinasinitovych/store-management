import { Component, ViewEncapsulation } from '@angular/core';
import { OrderStatus } from './modules/orders/models/orderStatus';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './modules/shared/shared.style.css']
  
})
export class AppComponent {
  title = 'store-management';
  orderStatus = OrderStatus;
}
