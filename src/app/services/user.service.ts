import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
   baseURL = 'http://localhost:3104/api/user';
   
  constructor(private userClient: HttpClient){}
  getuserById(id) {
    return this.userClient.get(`${this.baseURL}/${id}`);
  }
 
  edituser(id, user) {
    return this.userClient.post(`${this.baseURL}ظEdit/${id}`, user);
  }
}
