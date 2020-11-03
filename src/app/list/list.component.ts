import { Component, OnInit } from '@angular/core';
import { ProductStoreService } from '../core/service/product-store.service';
import { Product } from '../core/models/product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products: Array<Product> = [];

  constructor( private productStoreService: ProductStoreService ) {

  }

  ngOnInit(): void {
    this.productStoreService.load();
    console.log(this.productStoreService.products);

    this.products = this.productStoreService.products;
  }

}
