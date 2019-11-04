import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Customerinfo} from './customerinfo';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Confirmproduct} from './confirmproduct';
import {Paymentinfo} from './paymentinfo';

@Injectable({
  providedIn: 'root'
})
export class PaymentinfoService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8082';
  paymentinfos: Paymentinfo[];

  // getAll(): Observable<Confirmproduct[]> {
  //   return this.http.get(`${this.baseUrl}/listconfirmproduct.php`).pipe(
  //     map((res) => {
  //       this.confirmproducts = res['data'];
  //       return this.confirmproducts;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  store(paymentinfo: Paymentinfo): Observable<Paymentinfo[]> {
    return this.http.post(`${this.baseUrl}/storepaymentinfo.php`, { data: paymentinfo })
      .pipe(map((res) => {
          this.paymentinfos.push(res['data']);
          return this.paymentinfos;
        }),
        catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}

