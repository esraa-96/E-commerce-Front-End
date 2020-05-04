import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  submitOrder() {
    //update in database
    // confirm before submitting
    console.log('submitClicked');
    alert('Your order is submitted successfully');
    this.cart = { "orderDetails": [] };
  }
  get totalNumberOfItems() {
    let total = 0;
    for (let i = 0; i < this.cart.orderDetails.length; i++) {
      total += this.cart.orderDetails[i].numberOfItems;
    }
    return total;
  }
  get totalPrice() {
    let total = 0;
    for (let i = 0; i < this.cart.orderDetails.length; i++) {
      total += (this.cart.orderDetails[i].numberOfItems) *
        (this.cart.orderDetails[i].product.unitPrice) *
        (1 - (this.cart.orderDetails[i].product.discount));
    }
    return total;
  }
  cart: any = {
    "orderId": 0,
    "date": "2020-05-01T19:55:30.400Z",
    "status": 0,
    "totalPrice": 0,
    "userId": "string",
    "user": {
      "id": "string",
      "userName": "string",
      "normalizedUserName": "string",
      "email": "string",
      "normalizedEmail": "string",
      "emailConfirmed": true,
      "passwordHash": "string",
      "securityStamp": "string",
      "concurrencyStamp": "string",
      "phoneNumber": "string",
      "phoneNumberConfirmed": true,
      "twoFactorEnabled": true,
      "lockoutEnd": "2020-05-01T19:55:30.400Z",
      "lockoutEnabled": true,
      "accessFailedCount": 0,
      "age": 0,
      "address": "string",
      "gender": 0,
      "profilePic": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "order": [
        null
      ]
    },
    "orderDetails": [
      {
        "productId": 0,
        "orderId": 0,
        "numberOfItems": 0,
        "product": {
          "productID": 0,
          "productName": "string",
          "unitPrice": 10,
          "unitsInStock": 10,
          "discount": .5,
          "category": 0,
          "description": "string",
          "isDeleted": true,
          "image": [
            {
              "productID": 0,
              "imagePath": "string"
            }
          ],
          "orderDetails": [
            null
          ]
        }
      }, {
        "productId": 0,
        "orderId": 0,
        "numberOfItems": 0,
        "product": {
          "productID": 0,
          "productName": "string",
          "unitPrice": 20,
          "unitsInStock": 5,
          "discount": 0,
          "category": 0,
          "description": "string string string string string string string string string string string string string string string string string string string string string string string string string string string string string string string string string string string string ",
          "isDeleted": true,
          "image": [
            {
              "productID": 0,
              "imagePath": "string"
            }
          ],
          "orderDetails": [
            null
          ]
        }
      }, {
        "productId": 0,
        "orderId": 0,
        "numberOfItems": 0,
        "product": {
          "productID": 0,
          "productName": "string",
          "unitPrice": 30,
          "unitsInStock": 2,
          "discount": 0,
          "category": 0,
          "description": "string",
          "isDeleted": true,
          "image": [
            {
              "productID": 0,
              "imagePath": "string"
            }
          ],
          "orderDetails": [
            null
          ]
        }
      }
    ]
  }
}
