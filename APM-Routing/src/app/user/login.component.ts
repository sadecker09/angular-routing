import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private authService: AuthService, private router: Router) {}

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        // Navigate to the page the user was on before being redirected to the login page
        // this url was saved in the auth.service via the auth.guard
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        // If user went straight to the Login menu option, there was no previous url saved
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
