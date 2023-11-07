import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './modules/orders/components/order-list/order-list.component';
import { OrderFormComponent } from './modules/orders/components/order-form/order-form.component';
import { ProductsListComponent } from './modules/products/components/product-list/products-list.component';
import { AddProductToOrderComponent } from './modules/orders/components/add-product-to-order/add-product-to-order.component';
import { OrderDetailsComponent } from './modules/orders/components/order-details/order-details.component';
import { CustomerListComponent } from './modules/customers/components/customer-list/customer-list.component';
import { CustomerFormComponent } from './modules/customers/components/customer-form/customer-form.component';
import { ProductFormComponent } from './modules/products/components/product-form/product-form.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/orders/orders.module').then((m) => m.OrdersModule) },
  { path: 'orders', loadChildren: () => import('./modules/orders/orders.module').then((m) => m.OrdersModule) },
  { path: 'customers', loadChildren: () => import('./modules/customers/customers.module').then((m) => m.CustomersModule) },
  { path: 'products', loadChildren: () => import('./modules/products/products.module').then((m) => m.ProductsModule) },
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
