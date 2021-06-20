import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProductType } from '../shared/models/productType';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get<IPagination>(this.baseUrl + 'products');
  }

  getBrands() {
    return this.httpClient.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getProductTypes() {
    return this.httpClient.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
