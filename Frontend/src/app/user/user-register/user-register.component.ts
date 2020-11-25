import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/IUser';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup;
  user: User;
  formSubmitted: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private alertService: AlertifyService) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm(): void{
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      emailId: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, {validators: this.passwordMatchingValidator});
  }

  passwordMatchingValidator(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : {notmatched : true};
  }

  onSubmit(): void{
    console.log(this.registrationForm.value);
    this.formSubmitted = true;
    if (this.registrationForm.valid){
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.alertService.success('Congrats, you are successfully registered');
      this.formSubmitted = false;
    }
    else{
      this.alertService.error('Invalid input, try again');
    }
  }

  userData(): User{
    return this.user = {
      userName: this.userName.value,
      email: this.emailId.value,
      password: this.password.value,
      mobile: this.mobile.value
    };
  }

  // get utility methods

  get userName(): FormControl {
    return this.registrationForm.get('userName') as FormControl;
  }

  get emailId(): FormControl {
    return this.registrationForm.get('emailId') as FormControl;
  }

  get password(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile(): FormControl {
    return this.registrationForm.get('mobile') as FormControl;
  }

}
