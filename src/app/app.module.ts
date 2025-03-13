import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreateOrderComponent,
    OrderConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Añadir esto
    FormsModule // Añadir esto también
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
