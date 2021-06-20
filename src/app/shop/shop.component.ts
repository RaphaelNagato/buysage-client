import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  brands!: IBrand[];
  productTypes!: IProductType[];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts().subscribe(
      (response) => {
        this.products = response.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTypes() {
    this.shopService.getProductTypes().subscribe(
      (response) => {
        this.productTypes = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
