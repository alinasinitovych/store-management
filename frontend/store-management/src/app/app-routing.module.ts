import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { OrderFormComponent } from './components/orders/order-form/order-form.component';
import { ProductsListComponent } from './components/products/product-list/products-list.component';

const routes: Routes = [
  {path:'orders', component: OrderListComponent},

  {path: 'createorder', component: OrderFormComponent},
  {path: 'products', component: ProductsListComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
