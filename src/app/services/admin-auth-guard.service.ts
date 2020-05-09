import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn()) {

      if (this.auth.getUserRole() == 'admin')
        return true;
      this.router.navigate(['no-access']);
      return false;
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
