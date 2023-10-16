import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './modules/orders/components/order-list/order-list.component';
import { OrderFormComponent } from './modules/orders/components/order-form/order-form.component';
import { ProductsListComponent } from './modules/products/components/product-list/products-list.component';
import { AddProductToOrderComponent } from './modules/products/components/add-product-to-order/add-product-to-order.component';

const routes: Routes = [
  { path: 'orders', component: OrderListComponent },

  { path: 'createorder', component: OrderFormComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'add-product', component: AddProductToOrderComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
