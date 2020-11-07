import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductsResponse } from '../models/products-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  load(key): Observable<ProductsResponse> {
    return  this.http.get<ProductsResponse>(`${environment.serviceUrl}?key=${key}` )
    .pipe(
      map((productsResponse) => productsResponse ),
      catchError(this.handleError)
    );
  }

  handleError(error): Observable<never> {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
