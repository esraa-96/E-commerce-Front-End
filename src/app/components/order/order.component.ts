import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderProvider: OrderService,
    private auth: AuthService) { }

  ngOnInit(): void {
  }

  @Input() order;
  get isAdmin() {
    if (this.auth.getUserId() == 'admin')
      return true;
    return false;
  }

  //Admin
  acceptOrder(id) {
    this.orderProvider.acceptOrder(id)
      .subscribe((response) => {
        this.order.status = 2;
      }, (err) => {
        console.log(err);
      });
  }
  rejectOrder(id) {
    this.orderProvider.rejectOrder(id)
      .subscribe((response) => {
        this.order.status = 3;
      }, (err) => {
        console.log(err);
      });
  }

  //User
  cancelOrder(id) {
    this.orderProvider.cancelOrder(id)
      .subscribe(response => {
        console.log(response);
        this.order.status = 4;
      }, err => {
        console.log(err);
      });
  }
}
