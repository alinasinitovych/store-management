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
  products$: Observable<any> = this.productService.getAll();
  public displayedColumns: string[] = ['id', 'name', 'category', 'availableQuantity', 'price', 'action'];
  dataSource: MatTableDataSource<any>;
    constructor(private productService: ProductService) {
      this.dataSource = new MatTableDataSource<Product>();
  }
  ngOnInit(): void {
   
  }
  deleteProducts(id: number){
    console.log(id)
    this.productService.delete(id);
  }
}

