import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private client: HttpClient, private jwtHelper: JwtHelperService) { }

  // //test
  // private authToken: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ3MGNjZmQ5LWFkY2UtNGYwZC04ZjkxLTNmMGYzYWQ2MjA3OCIsIklEIjoiNDcwY2NmZDktYWRjZS00ZjBkLThmOTEtM2YwZjNhZDYyMDc4IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJSb2xlIjoiYWRtaW4iLCJleHAiOjE1OTEwNDk4ODIsImlzcyI6Imh0dHA6Ly9haG1hZG1vemFmZmFyLm5ldCIsImF1ZCI6Imh0dHA6Ly9haG1hZG1vemFmZmFyLm5ldCJ9.Lk5Lafjy-fK9ctvIgIRpAXccY9nTq97Jbv-dxbH6KY4';

  // //admin
  // private authToken: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ3MGNjZmQ5LWFkY2UtNGYwZC04ZjkxLTNmMGYzYWQ2MjA3OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImFkbWluIiwiZXhwIjoxNTkwNzg2ODAzLCJpc3MiOiJodHRwOi8vYWhtYWRtb3phZmZhci5uZXQiLCJhdWQiOiJodHRwOi8vYWhtYWRtb3phZmZhci5uZXQifQ.H8XJqcQ-WVnGHM6SVGI0C2oM2LGRPttq7EttZlX-VP8';

  // //user
  // private authToken: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InVzZXJAdXNlci5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImEyYzc1NDhlLTE4YTQtNDBiNi1iY2YxLTk4MGVlODlmYTY0NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJleHAiOjE1OTA5NTQ4MjEsImlzcyI6Imh0dHA6Ly9haG1hZG1vemFmZmFyLm5ldCIsImF1ZCI6Imh0dHA6Ly9haG1hZG1vemFmZmFyLm5ldCJ9.EUEkJVoCJTWfSfLuCGhMHDElPnDFmORhmdX3X9VFx-4';

  baseURL = 'http://localhost:3104/api/account';

  // test() {
  //   let currentUser = this.jwtHelper.decodeToken(this.getAuthToken());
  //   console.log(currentUser);
  //   console.log(currentUser.Role);
  //   console.log(currentUser.Id);
  // }


  login(email, pw) {
    const user = {
      "email": email,
      "password": pw
    };
    return this.client.post(`${this.baseURL}/login`, user)
      .pipe(
        map(
          (response: any) => {
            if (response && response.message) {
              // We wanna store it in localStorage  
              localStorage.setItem('access_token', response.message);
              return true;
              // this.authToken = `Bearer ${response.message}`;
            }
            return false;
          }));
  }
  logout() {
    localStorage.removeItem('access_token');
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
      return currentUser.Id;
  }
  getUserRole() {
    let currentUser = this.jwtHelper.decodeToken(this.getAuthToken());
    if (currentUser)
      return currentUser.Role;
  }

}
