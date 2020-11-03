import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {

  products: Array<Product> = [];
  constructor() {


  }
  load() {
    this.products.push(new Product({id: '1', name: 'uno'}));
    this.products.push(new Product({id: '2', name: 'dos'}));
    this.products.push(new Product({id: '3', name: 'tres'}));
  }
}
