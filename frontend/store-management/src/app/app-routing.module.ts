import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './modules/orders/components/order-list/order-list.component';
import { OrderFormComponent } from './modules/orders/components/order-form/order-form.component';
import { ProductsListComponent } from './modules/products/components/product-list/products-list.component';
import { AddProductToOrderComponent } from './modules/orders/components/add-product-to-order/add-product-to-order.component';
import { OrderDetailsComponent } from './modules/orders/components/order-details/order-details.component';
import { CustomerListComponent } from './modules/customers/components/customer-list/customer-list.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/orders/orders.module').then((m) => m.OrdersModule) },
  { path: 'customers', loadChildren: () => import('./modules/customers/customers.module').then((m) => m.CustomersModule) },
  { path: 'createorder', component: OrderFormComponent },
  { path: 'products', loadChildren: () => import('./modules/products/products.module').then((m) => m.ProductsModule) },
  { path: 'add-product', component: AddProductToOrderComponent },
  { path: 'orderdata/:id', component: OrderDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
