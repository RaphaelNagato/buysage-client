import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders/orders-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, OrdersRoutingModule],
  exports: [OrdersRoutingModule],
})
export class OrdersModule {}
