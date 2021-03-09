import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http: HttpClient) { }

  authUser(loginForm: any): Observable<any> {
    return this.http.post('https://localhost:44316/api/token', { email: loginForm.emailId, password: loginForm.password }, { observe: 'response' })
      .pipe(catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }
}
