import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modules/products/models/product';
import { ProductService } from 'src/app/modules/products/services/product.service';

@Component({
  selector: 'app-add-product-to-order',
  templateUrl: './add-product-to-order.component.html',
  styleUrls: ['./add-product-to-order.component.css']
})
export class AddProductToOrderComponent implements OnInit {

  public products!: Observable<Product[]>;
  constructor(private orderService: ProductService, private router: Router) {

  }
  ngOnInit(): void {
    this.products = this.orderService.getAll();
  }
}
