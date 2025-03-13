import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateOrderComponent} from './create-order/create-order.component';
import {OrderConfirmationComponent} from './order-confirmation/order-confirmation.component';

const routes: Routes = [
  { path: '', component: CreateOrderComponent },
  { path: 'confirmation/:id', component: OrderConfirmationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
