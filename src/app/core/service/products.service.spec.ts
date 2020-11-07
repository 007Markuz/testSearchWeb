import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {  of, Observable, throwError } from 'rxjs';
import { ProductsService } from './products.service';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';



describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        ProductsService,
        {provide: HttpClient,
        useFactory(){
          return { get(key,header){

            if( key === `${environment.serviceUrl}?key=error`){
              return throwError({status: 500, message: 'error'});
            }
            if( key === `${environment.serviceUrl}?key=ErrorEvent`){
              return throwError({error: new ErrorEvent('type',{ message: 'ErrorEvent'} ) });
            }
            return of();

          }};
        }}
      ]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return an Observable', () => {
    expect(service.load('')).toBeInstanceOf(Observable);
  });

  it('should be throwError', (done ) => {
    service.load('error') .subscribe( null, element => {
      expect(element).toBe('Error Code: 500\nMessage: error');
      done();
    });
  });

  it('should be ErrorEvent', (done ) => {
    service.load('ErrorEvent') .subscribe( null, element => {
      expect(element).toBe('ErrorEvent');
      done();
    });
  });
});
