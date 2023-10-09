import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsListComponent } from './components/product-list/products-list.component';

@NgModule({
  declarations: [
    ProductsListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
