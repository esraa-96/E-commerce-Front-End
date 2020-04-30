import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderProvider: OrderService) { }

  ngOnInit(): void {
  }

  @Input() order;

  acceptOrder(id) {
    this.orderProvider.acceptOrder(id)
      .subscribe((response) => {
        this.order.status = 2;
      }, (err) => {
        console.log(err);
      })
  }
  rejectOrder(id) {
    this.orderProvider.rejectOrder(id)
      .subscribe((response) => {
        this.order.status = 3;
      }, (err) => {
        console.log(err);
      })
  }

}
