import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;
  categories: Category[] = []
  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.productService.getById(productId).subscribe((product) => {
        this.product = product;
      })
    })
    this.productService.categories$.subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

 

}
