import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private client: HttpClient) { }

  private authToken: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ3MGNjZmQ5LWFkY2UtNGYwZC04ZjkxLTNmMGYzYWQ2MjA3OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImFkbWluIiwiZXhwIjoxNTkwNzg2ODAzLCJpc3MiOiJodHRwOi8vYWhtYWRtb3phZmZhci5uZXQiLCJhdWQiOiJodHRwOi8vYWhtYWRtb3phZmZhci5uZXQifQ.H8XJqcQ-WVnGHM6SVGI0C2oM2LGRPttq7EttZlX-VP8';

  baseURL = 'http://localhost:3104/api/account';

  login(email, pw) {
    const user = {
      "email": email,
      "password": pw
    };
    debugger;
    this.client.post(`${this.baseURL}/login`, user)
      .subscribe(
        (response: any) => {
          debugger;
          console.log(response);
          this.authToken = `Bearer ${response.message}`;
        },
        (err) => {
          debugger;
          console.log(err);
        });
  }
  getAuthToken() {
    debugger;
    return this.authToken
  };

}
