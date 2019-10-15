import { Injectable } from '@angular/core';
import {Car} from './car';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8082';
  users: User[];

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get(`${this.baseUrl}/user.php`).pipe(
      map((res) => {
        this.users = res['data'];
        return this.users;
      }),
      catchError(this.handleError)
    );
  }
  store(user: User): Observable<User[]> {
    return this.http.post(`${this.baseUrl}/userstore.php`, { data: user })
      .pipe(map((res) => {
          this.users.push(res['data']);
          return this.users;
        }),
        catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
