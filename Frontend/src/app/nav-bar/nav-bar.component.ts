import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/IUser';
import { AlertifyService } from '../services/alertify.service';
import { JwtServiceService } from '../services/jwt-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedInUser: any;

  constructor(private alertify: AlertifyService, private router: Router, private jwtDecoder: JwtServiceService) { }

  ngOnInit(): void {
  }

  loggedin(): any{
    const token = localStorage.getItem('jwtToken');
    if (token){
      const decodedToken = this.jwtDecoder.decodeToken(token);
      if (decodedToken){
        console.log(decodedToken);
        this.loggedInUser = decodedToken.given_name;
        console.log(this.loggedInUser);
        console.log('wtf');
      }
      else{
        this.loggedInUser = '';
      }
    }
    return this.loggedInUser;
  }

  onLogout(): void{
    localStorage.removeItem('jwtToken');
    this.loggedInUser = '';
    this.router.navigate(['/']);
  }

}
