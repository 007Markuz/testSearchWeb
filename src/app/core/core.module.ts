import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStoreService } from './service/product-store.service';
import { Product } from './models/product';




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], exports: [
    ProductStoreService,
    Product
  ], providers: [
    ProductStoreService
  ]
})
export class CoreModule { }
