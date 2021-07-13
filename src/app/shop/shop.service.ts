import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProductType } from '../shared/models/productType';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private httpClient: HttpClient) {}

  getProducts(brandId?: number, productTypeId?: number, sort?: string) {
    let params = new HttpParams();
    if (brandId) {
      params = params.append("brandId", brandId.toString());
    }
    if (productTypeId) {
      params = params.append("typeId", productTypeId.toString())
    }
    if (sort) {
      params = params.append("sort", sort)
    }
    return this.httpClient.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(
        map(response => response.body)
      );
  }

  getBrands() {
    return this.httpClient.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getProductTypes() {
    return this.httpClient.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
