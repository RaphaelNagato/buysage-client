import { v4 as uuid4 } from 'uuid';

export interface IBasket {
  id: string;
  items: IBasketItem[];
  clientSecret?: string;
  paymentIntentId?: string;
  deliveryMethodId?: number;
  shippingPrice?: number;
}

export interface IBasketItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export interface IBasketTotals {
  shipping: number;
  subTotal: number;
  total: number;
}
export class Basket implements IBasket {
  id = uuid4();
  items: IBasketItem[] = [];
}
