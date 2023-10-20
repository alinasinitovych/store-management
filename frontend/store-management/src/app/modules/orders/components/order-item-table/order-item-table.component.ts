import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-item-table',
  templateUrl: './order-item-table.component.html',
  styleUrls: ['./order-item-table.component.css']
})
export class OrderItemTableComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.dataSource)
  }
  displayedColumns: string[] = ['Product Id', 'Product Name', 'Product Category', 'Product Size', 'Product Quantity', 'Product Price', 'Action'];

  @Input() dataSource: any;
  @Output() deleteOrderItem = new EventEmitter<any>();

}
