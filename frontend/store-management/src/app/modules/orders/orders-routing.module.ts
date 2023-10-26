import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { AddProductToOrderComponent } from './components/add-product-to-order/add-product-to-order.component';

const routes: Routes = [
  { path: '', component: OrderListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/createorder', component: OrderFormComponent },
  { path: 'orders/add-order-item', component: AddProductToOrderComponent },

  { path: 'orders/details/:id', component: OrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}