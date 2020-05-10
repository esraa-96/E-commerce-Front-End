import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseURL = 'http://localhost:3104/api/Cart';

  constructor(private CartClient: HttpClient) { }
 


  addToCart(OrderDetails) {
    return this.CartClient.post(`${this.baseURL}`, OrderDetails);
  }

  getUserCartByUserId(userId){
    return this.CartClient.get(`${this.baseURL}/${userId}`);
  }

  getCartId(){
    return localStorage.getItem("cart");
  }

  changeQuantity(OrderDetail)
  {
    return this.CartClient.put(`${this.baseURL}`,OrderDetail);
  }

  removeFromCart(OrderDetail)
  {
    return this.CartClient.put(`${this.baseURL}/remove`,OrderDetail);
  }
  


}
