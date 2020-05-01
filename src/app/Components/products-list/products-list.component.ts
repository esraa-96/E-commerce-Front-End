import { Component, OnInit } from '@angular/core';
import {ProductService} from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  //PrdId;
  constructor(private service:ProductService,myAR:ActivatedRoute)
  {
      //this.PrdId=myAR.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.service.getAllProducts()
      .subscribe(
        (response) => {
          this.products = response;
          console.log(response);

        },
        (err) => {
          console.log(err);
        });

      //   this.service.editProduct(1,this.prd)
      // .subscribe(
      //   (response) => {
      //     this.products = response;
      //     console.log(response);

      //   },
      //   (err) => {
      //     console.log(err);
      //   });

   
  }
  products;
  prd=  {
    "productID": 1,
    "productName":'erap',
    "unitPrice": 10,
    "unitsInStock": 12,
    "discount": 23,
    "category": 1,
    "description": "jjj",
    "isDeleted": false,
  }
  
}
