import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductsResponse } from '../models/products-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  HttpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private http: HttpClient) {}

  load(key): Observable<ProductsResponse> {
    return  this.http.get<ProductsResponse>(`${environment.serviceUrl}?key=${key}`,this.HttpHeaders )
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
