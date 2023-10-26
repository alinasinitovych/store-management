import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order';
import { CreateOrderDto } from '../../models/createOrderDto';
import { OrderService } from '../../services/order.service';
import { OrderStatus } from '../../models/orderStatus';
import { MatTableDataSource } from '@angular/material/table';
import { OrderItem } from '../../models/orderItem';
import { OrderStatusText } from '../../models/orderStatusText';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css', '../../../shared/shared.style.css']
})
export class OrderDetailsComponent implements OnInit {
  displayedColumns: string[] = ['Product Id', 'Product Name', 'Product Category', 'Product Size', 'Product Quantity', 'Product Price', 'Action'];

  order: Order | undefined;
  dataSource: MatTableDataSource<OrderItem>;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    this.dataSource = new MatTableDataSource<OrderItem>();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orderId = +params['id'];
      this.orderService.getById(orderId).subscribe((order) => {
        this.order = order;

        this.dataSource = new MatTableDataSource<OrderItem>(this.order?.orderItems);
      });
    });
  }

  getOrderStatusName(status: OrderStatus | undefined): string {
    if (status === undefined || OrderStatusText[status] === undefined) {
      return 'Unknown';
    }
    return OrderStatusText[status];
  }
}
