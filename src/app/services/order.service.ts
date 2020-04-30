import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseURL = 'http://localhost:3104/api/orders';
  authToken: string;
  constructor(private client: HttpClient) { }

  //admin only
  getAllOrders() {
    return this.client.get(this.baseURL);
  }
  acceptOrder(id) {
    return this.client.put(`${this.baseURL}/accept/${id}`, {});
  }
  rejectOrder(id) {
    return this.client.put(`${this.baseURL}/reject/${id}`, {});
  }

  //user only
  //needs userID......
  getOrders(userId) {
    return this.client.get(`${this.baseURL}/${userId}`);
  }
  submitOrder(id) {
    return this.client.put(`${this.baseURL}/submit/${id}`, {});
  }
  cancelOrder(id) {
    return this.client.put(`${this.baseURL}/cancel/${id}`, {});
  }

}
