import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(
    private orderProvider: OrderService,
    private authProvider: AuthService) {
    this.orderList = [];
  }

  orderList: any;

  get isAdmin() {
    if (this.authProvider.getUserRole() == 'admin')
      return true;
    return false;
  }

  ngOnInit(): void {

    // this.authProvider.login("user@example.com", "Ahmed!23");
    if (this.authProvider.getUserRole() == "admin") {
      this.orderProvider.getAllOrders()
        .subscribe(
          (response) => {
            this.orderList = response;
          },
          (err) => {
          });
    }
    else if (this.authProvider.getUserRole() == "user") {
      this.orderProvider.getOrders(this.authProvider.getUserId())
        .subscribe(
          (response) => {
            this.orderList = response;
          },
          (err) => {
          });
    }
    // }, 200);
  }

}
