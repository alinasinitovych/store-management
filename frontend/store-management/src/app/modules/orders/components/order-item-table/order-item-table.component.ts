import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductSize } from 'src/app/modules/products/models/productSize.enum';
import { ProductSizeText } from 'src/app/modules/products/models/productSizeText';

@Component({
  selector: 'app-order-item-table',
  templateUrl: './order-item-table.component.html',
  styleUrls: ['./order-item-table.component.css', '../../../shared/shared.style.css']
})
export class OrderItemTableComponent implements OnInit {

  displayedColumns: string[] = ['Product Id', 'Product Name', 'Product Category', 'Product Size', 'Product Quantity', 'Product Price'];

  @Input() dataSource: any;
  @Output() deleteOrderItem = new EventEmitter<any>();

  ngOnInit(): void {
    console.log(this.dataSource)
  }

  getProductSizeText(productSize: ProductSize){
    return ProductSizeText[productSize];
  }
}
