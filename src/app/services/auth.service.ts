import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private client: HttpClient) { }

  ////admin
  //private authToken: string ='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ3MGNjZmQ5LWFkY2UtNGYwZC04ZjkxLTNmMGYzYWQ2MjA3OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImFkbWluIiwiZXhwIjoxNTkwNzg2ODAzLCJpc3MiOiJodHRwOi8vYWhtYWRtb3phZmZhci5uZXQiLCJhdWQiOiJodHRwOi8vYWhtYWRtb3phZmZhci5uZXQifQ.H8XJqcQ-WVnGHM6SVGI0C2oM2LGRPttq7EttZlX-VP8';

  //user
  private authToken: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InVzZXJAdXNlci5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImEyYzc1NDhlLTE4YTQtNDBiNi1iY2YxLTk4MGVlODlmYTY0NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJleHAiOjE1OTA5NTQ4MjEsImlzcyI6Imh0dHA6Ly9haG1hZG1vemFmZmFyLm5ldCIsImF1ZCI6Imh0dHA6Ly9haG1hZG1vemFmZmFyLm5ldCJ9.EUEkJVoCJTWfSfLuCGhMHDElPnDFmORhmdX3X9VFx-4';

  baseURL = 'http://localhost:3104/api/account';

  login(email, pw) {
    const user = {
      "email": email,
      "password": pw
    };
    this.client.post(`${this.baseURL}/login`, user)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.authToken = `Bearer ${response.message}`;
        },
        (err) => {
          console.log(err);
        });
  }
  getAuthToken() {
    return this.authToken
  };

}
