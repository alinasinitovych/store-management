import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { OrderStatus } from '../../models/orderStatus';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css', '../../../shared/shared.style.css']

})
export class OrderListComponent implements OnInit {
  orders$: Observable<any> = this.orderService.getAll();
  orderStatus = OrderStatus;
  public displayedColumns: string[] = ['orderNumber', 'customerName', 'customerAddress', 'totalCost', 'status'];
  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
    this.orders$ = this.orderService.getAll();
  }
}
