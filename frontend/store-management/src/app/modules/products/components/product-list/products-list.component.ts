import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products$ !: Observable<any>;
  public displayedColumns: string[] = ['id', 'name', 'category', 'size', 'availableQuantity', 'price', 'Action'];

  constructor(private productService: ProductService) {
  }
  ngOnInit(): void {
    this.products$ = this.productService.getAll();
  }
}

