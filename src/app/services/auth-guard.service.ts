import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
    private route: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn())
      return true;
    this.route.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
