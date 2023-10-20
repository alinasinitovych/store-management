import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AddProductToOrderComponent } from './components/add-product-to-order/add-product-to-order.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderItemTableComponent } from './components/order-item-table/order-item-table.component';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [
    OrderFormComponent,
    OrderListComponent,
    AddProductToOrderComponent,
    OrderDetailsComponent,
    OrderItemTableComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class OrdersModule { }
