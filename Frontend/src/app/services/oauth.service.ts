import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor() { }

  authUser(user: any): any{
    let userArray = [];
    if (localStorage.getItem('users')){
      userArray = JSON.parse(localStorage.getItem('users'));
    }
    return userArray.find(p => p.emailId === user.emailId && p.password === user.password);
  }
}
