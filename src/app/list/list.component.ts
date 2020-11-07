import { Component } from '@angular/core';
import { ProductStoreService } from '../core/service/product-store.service';
import { Product } from '../core/models/product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent  {

  constructor( public productService: ProductStoreService ) {
  }
}
