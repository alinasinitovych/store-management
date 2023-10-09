import { Component , OnInit} from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from 'src/app/models/orders/order';
import { OrderStatus } from 'src/app/models/orders/orderStatus';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css','../../../../app.component.css']

})
export class OrderListComponent implements OnInit {
  orders$: Observable<any>;
  orderStatus = OrderStatus; 
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['orderNumber', 'customerName', 'customerAddress', 'totalCost', 'status'];
  constructor(private orderService: OrderService) {
    this.orders$ = new Observable<any>();
  }

  ngOnInit() {
    this.orders$ = this.orderService.getAll();
  }
  
}
