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
      
        /*this.service.createProduct(this.prd)
        .subscribe(
          (response) => {
            console.log(this.prd)
            //this.products = response;
            console.log(response);
            console.log("da el response");
  
          },
          (err) => {
            console.log(err);
          });*/

      
   
  }
  
  products;
  
  
}
