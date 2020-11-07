import { TestBed } from '@angular/core/testing';

import { ProductStoreService } from './product-store.service';
import { ProductsService } from './products.service';
import { of, Observable } from 'rxjs';
import { async } from 'q';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductStoreService', () => {
  let service: ProductStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide: ProductsService,
        useFactory(){
          return { load(key){
              return of({products:[
                {id:1,
                brand: '1',
                description: '1',
                image: '1',
                price: 1,
                discount: 1}
              ]});
          }};
        }}
      ]
    });
    service = TestBed.inject(ProductStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return a Observable', async (done) => {
    service.loadProduct('foo');
    expect(service.products).toBeInstanceOf(Observable);
    service.products.subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].brand).toBe('1');
      expect(products[0].description).toBe('1');
      expect(products[0].image).toBe('1');
      expect(products[0].price).toBe(1);
      expect(products[0].discount).toBe(1);
      done();
    });

  });
});
