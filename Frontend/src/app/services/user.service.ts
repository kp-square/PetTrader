import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: User): void{
    this.http.post('https://localhost:44316/api/userregister', user).subscribe(
      token => {
        console.log(token);
        console.log('fine');
      }

    );
    // let users = [];
    // if (localStorage.getItem('users')){
    //   users = JSON.parse(localStorage.getItem('users'));
    //   console.log(typeof(users));
    //   users = [user, ...users];
    // }
    // else {
    //   users = [ user ];
    // }
    // localStorage.setItem('users', JSON.stringify(users));
  }
}
