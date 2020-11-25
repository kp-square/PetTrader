import { Injectable } from '@angular/core';
import { User } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user: User): void{
    let users = [];
    if (localStorage.getItem('users')){
      users = JSON.parse(localStorage.getItem('users'));
      console.log(typeof(users));
      users = [user, ...users];
    }
    else {
      users = [ user ];
    }
    localStorage.setItem('users', JSON.stringify(users));
  }
}
