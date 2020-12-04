import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http: HttpClient) { }

  authUser(loginForm: any): any{
    return this.http.post('https://localhost:44316/api/token', {email: loginForm.emailId, password : loginForm.password}).subscribe(
      token => {
          const data = JSON.parse(JSON.stringify(token));
          localStorage.setItem('jwtToken', data.access_Token);
          return true;
      },
      error => {
        console.log('fuck it', error);
        return false;
      }
    );
  }
}
