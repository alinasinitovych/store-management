import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsListComponent } from './components/product-list/products-list.component';
import { AddProductToOrderComponent } from '../orders/components/add-product-to-order/add-product-to-order.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class ProductsModule { }
