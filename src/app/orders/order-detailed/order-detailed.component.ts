import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
})
export class OrderDetailedComponent implements OnInit {
  order!: IOrder;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private ordersService: OrdersService
  ) {
    this.bcService.set('@OrderDetailed', ' ');
  }

  ngOnInit(): void {
    this.ordersService
      .getOrderDetailed(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(
        (order: IOrder) => {
          this.order = order;
          this.bcService.set(
            '@OrderDetailed',
            `Order #${order.id} - ${order.status}`
          );
        },
        (err) => console.log(err)
      );
  }
}
