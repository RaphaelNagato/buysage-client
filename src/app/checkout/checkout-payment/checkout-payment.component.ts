import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IAddress } from 'src/app/shared/models/address';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe(
      (order: IOrder) => {
        this.toastrService.success('Order created successfully');
        this.basketService.deleteLocalBasket();
        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], navigationExtras);
      },
      (err) => {
        this.toastrService.error(err.message);
        console.log(err);
      }
    );
  }

  getOrderToCreate(basket: IBasket | null) {
    return {
      basketId: basket?.id as string,
      shipToAddress: this.checkoutForm.get('addressForm')?.value as IAddress,
      deliveryMethodId: this.checkoutForm
        .get('deliveryForm')
        ?.get('deliveryMethod')?.value as number,
    };
  }
}
