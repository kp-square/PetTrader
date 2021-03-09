import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  constructor(private oauth: OauthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm): void {
    const status = this.oauth.authUser(loginForm.value);
    status.subscribe({
      next: response => {
        if (response.status >= 200 && response.status < 400) {
          const token = JSON.parse(JSON.stringify(response.body));
          localStorage.setItem('jwtToken', token.access_Token);
          this.alertify.success('logged in successfully');
          this.router.navigate(['/']);
        }
      },
      error: error => {
        console.log(error.message)
        this.alertify.error('Error! Either email or password is wrong. Try again.')
      }
    })
  }
}
