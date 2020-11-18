import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedInUser: any;

  constructor(private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }

  loggedin(): any{
    this.loggedInUser = localStorage.getItem('token');
    console.log(this.loggedInUser);
    return this.loggedInUser;
  }

  onLogout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
