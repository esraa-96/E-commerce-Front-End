import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private client: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router) { }

  baseURL = 'http://localhost:3104/api/account';

  login(email, pw) {
    const user = {
      "email": email,
      "password": pw
    };
    return this.client.post(`${this.baseURL}/login`, user)
      .pipe(
        map(
          (response: any) => {
            if (response) {
              if (response.status == 400) {
                // debugger;
                return false;
              }

              if (response.message) {
                // debugger;
                // We wanna store it in localStorage  
                localStorage.setItem('access_token', response.message);
                return true;
                // this.authToken = `Bearer ${response.message}`;
              }
            }
            // debugger;
            return false;
          }));
  }

  register(user: any) {
    return this.client.post(`${this.baseURL}/register`, user);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    let token = localStorage.getItem('access_token');
    if (!token)
      return false;
    let isExpired = this.jwtHelper.isTokenExpired(token);
    return !isExpired;
  }
  getAuthToken() {
    return localStorage.getItem("access_token");
  }

  getUserId() {
    let currentUser = this.jwtHelper.decodeToken(this.getAuthToken());
    if (currentUser)
      return currentUser.ID;
  }

  getUserRole() {
    let currentUser = this.jwtHelper.decodeToken(this.getAuthToken());
    if (currentUser)
      return currentUser.Role;
  }

}
