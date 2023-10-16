import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-item-table',
  templateUrl: './order-item-table.component.html',
  styleUrls: ['./order-item-table.component.css']
})
export class OrderItemTableComponent {
  displayedColumns: string[] = ['Product Id', 'Product Name', 'Product Category', 'Product Size', 'Product Quantity', 'Product Price', 'Action'];

  @Input() dataSource: any;
  @Output() deleteOrderItem = new EventEmitter<any>();
}
