import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Customerinfo} from './customerinfo';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Confirmproduct} from './confirmproduct';

@Injectable({
  providedIn: 'root'
})
export class ConfirmproductService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8082';
  confirmproducts: Confirmproduct[];

  getAll(): Observable<Confirmproduct[]> {
    return this.http.get(`${this.baseUrl}/listconfirmproduct.php`).pipe(
      map((res) => {
        this.confirmproducts = res['data'];
        return this.confirmproducts;
      }),
      catchError(this.handleError)
    );
  }

  store(confirmproduct: Confirmproduct): Observable<Confirmproduct[]> {
    return this.http.post(`${this.baseUrl}/storeconfirmproduct.php`, { data: confirmproduct })
      .pipe(map((res) => {
          this.confirmproducts.push(res['data']);
          return this.confirmproducts;
        }),
        catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
