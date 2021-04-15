import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { slideInAnimation } from './app.animation';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent {
  pageTitle = 'Acme Product Management';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService, private router: Router) {}

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    // use navigateByUrl method instead of navigate to clear out any parameters or secondary routes
    this.router.navigateByUrl('/welcome');
  }
}
