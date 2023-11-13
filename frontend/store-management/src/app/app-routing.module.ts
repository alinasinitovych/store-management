import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
  { path: 'orders',loadChildren: () => import('./modules/orders/orders.module').then((m) => m.OrdersModule) },
  { path: 'customers',loadChildren: () => import('./modules/customers/customers.module').then((m) => m.CustomersModule) },
  { path: 'products',loadChildren: () => import('./modules/products/products.module').then((m) => m.ProductsModule) },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
