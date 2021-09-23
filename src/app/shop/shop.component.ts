import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) SearchTerm!: ElementRef;
  products: IProduct[] = [];
  brands!: IBrand[];
  productTypes!: IProductType[];
  shopParams: ShopParams;
  totalCount!: number;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.shopParams;
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(
      (response) => {
        this.products = response!.data;
        this.totalCount = response!.count;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTypes() {
    this.shopService.getProductTypes().subscribe(
      (response) => {
        this.productTypes = [{ id: 0, name: 'All' }, ...response];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onBrandIdSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onProductTypeIdSelected(productTypeId: number) {
    const params = this.shopService.getShopParams();

    params.productTypeId = productTypeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);

    this.getProducts();
  }

  onSortSelected(event: any) {
    const params = this.shopService.getShopParams();

    params.sort = event.target.value;
    this.shopService.setShopParams(params);

    this.getProducts();
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();

    if (params.pageNumber != event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);

      this.getProducts(true);
    }
  }

  onSearch() {
    const params = this.shopService.getShopParams();

    params.search = this.SearchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);

    this.getProducts();
  }

  onReset() {
    this.SearchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
