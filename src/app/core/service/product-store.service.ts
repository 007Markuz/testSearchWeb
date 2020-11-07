import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  products: Observable<Product[]> = of([]);

  constructor(private productsService: ProductsService ){

  }

  loadProduct(key){
    this.productsService.load(key).subscribe((productsResponse) => {

      this.products = of(productsResponse.products);

    });
  }

}
