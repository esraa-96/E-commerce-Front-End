import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private orderProvider: OrderService) { }

  orderList: any = [
    {
      "orderId": 1,
      "date": "2020-04-20T00:00:00",
      "status": 1,
      "totalPrice": 75.0000,
      "userId": "123",
      "user": null,
      "orderDetails": [
        {
          "productId": 1,
          "orderId": 1,
          "numberOfItems": 3,
          "product": {
            "productID": 1,
            "productName": "TESTPRODUCT",
            "unitPrice": 10.0000,
            "unitsInStock": 27,
            "discount": 0.0000,
            "category": 0,
            "description": null,
            "isDeleted": false,
            "image": [],
            "orderDetails": []
          }
        },
        {
          "productId": 2,
          "orderId": 1,
          "numberOfItems": 3,
          "product": {
            "productID": 2,
            "productName": "test2",
            "unitPrice": 20.0000,
            "unitsInStock": 47,
            "discount": 0.2500,
            "category": 0,
            "description": null,
            "isDeleted": false,
            "image": [],
            "orderDetails": [
              {
                "productId": 2,
                "orderId": 2,
                "numberOfItems": 49
              }
            ]
          }
        }
      ]
    },
    {
      "orderId": 2,
      "date": "2020-04-21T00:00:00",
      "status": 3,
      "totalPrice": 735.0000,
      "userId": "123",
      "user": null,
      "orderDetails": [
        {
          "productId": 2,
          "orderId": 2,
          "numberOfItems": 49,
          "product": {
            "productID": 2,
            "productName": "test2",
            "unitPrice": 20.0000,
            "unitsInStock": 47,
            "discount": 0.2500,
            "category": 0,
            "description": null,
            "isDeleted": false,
            "image": [],
            "orderDetails": [
              {
                "productId": 2,
                "orderId": 1,
                "numberOfItems": 3
              }
            ]
          }
        }
      ]
    }
  ]

  ngOnInit(): void {
    this.orderProvider.getAllOrders()
      .subscribe(
        (response) => {
          console.log(response);
          this.orderList = response;
        },
        (err) => {
          console.log(err);
        });
  }

}
