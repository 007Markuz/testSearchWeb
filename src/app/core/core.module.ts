import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStoreService } from './service/product-store.service';
import { Product } from './models/product';
import { HeaderComponent } from './common/header/header.component';


@NgModule({
  declarations: [HeaderComponent],
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
