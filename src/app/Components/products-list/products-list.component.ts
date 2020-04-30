import { Component, OnInit } from '@angular/core';
import {ProductService} from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(private service:ProductService) { }

  ngOnInit(): void {
   /* this.service.getAllProducts()
      .subscribe(
        (response) => {
          this.products = response;
          console.log(response);

        },
        (err) => {
          console.log(err);
        });*/

        let prd ={
          //"productID": 0,
          "productName": "blalala",
          "unitPrice": 0,
          "unitsInStock": 0,
          "discount": 0,
          "category": 0,
          "description": "strndndjndking",
          "isDeleted": true

        }
        this.service.createProduct(prd)
        .subscribe(
          (response) => {
            //this.products = response;
            console.log(response);
            console.log("da el response");
  
          },
          (err) => {
            console.log(err);
          });
  }

  products;
  
}
