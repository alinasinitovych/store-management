import { Component , OnInit} from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order, OrderStatus } from 'src/app/models/order';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css','../../../app.component.css']

})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = OrderStatus; 
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }
  loadOrders():void{
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
    },
    error=>{
      console.error('Error ocurred when loading orders', error);
    }
    );
    
  }
}
