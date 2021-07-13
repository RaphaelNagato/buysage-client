import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProductType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private httpClient: HttpClient) {}

  getProducts(shopParams : ShopParams) {
    let params = new HttpParams();
    if (shopParams.brandId !== 0) {
      params = params.append("brandId", shopParams.brandId.toString());
    }
    if (shopParams.productTypeId !== 0) {
      params = params.append("typeId", shopParams.productTypeId.toString());
    }

    params = params.append("sort", shopParams.sort);
    params = params.append("pageIndex", shopParams.pageNumber.toString());
    params = params.append("pageSize", shopParams.pageSize.toString());

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
