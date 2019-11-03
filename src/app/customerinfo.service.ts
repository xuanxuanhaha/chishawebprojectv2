import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Customerinfo} from './customerinfo';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Car} from './car';

@Injectable({
  providedIn: 'root'
})
export class CustomerinfoService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8082';
  customerinfos: Customerinfo[];

  getAll(): Observable<Customerinfo[]> {
    return this.http.get(`${this.baseUrl}/listcustomerinfo.php`).pipe(
      map((res) => {
        this.customerinfos = res['data'];
        return this.customerinfos;
      }),
      catchError(this.handleError)
    );
  }

  store(customerinfo: Customerinfo): Observable<Customerinfo[]> {
    return this.http.post(`${this.baseUrl}/storecustomerinfo.php`, { data: customerinfo })
      .pipe(map((res) => {
          this.customerinfos.push(res['data']);
          return this.customerinfos;
        }),
        catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
  console.log(error);

  // return an observable with a user friendly message
  return throwError('Error! something went wrong.');
}
}
