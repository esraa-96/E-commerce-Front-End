import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private orderProvider: OrderService, private authProvider: AuthService) { }

  orderList: any;

  ngOnInit(): void {
    // debugger;
    // this.authProvider.login("user@example.com", "Ahmed!23");

    // setTimeout(() => {
    this.orderProvider.getAllOrders()
      .subscribe(
        (response) => {
          this.orderList = response;
        },
        (err) => {
          console.log(err);
        });
    // }, 200);
  }

}
