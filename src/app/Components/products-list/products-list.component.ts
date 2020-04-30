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
    this.service.getAllProducts()
      .subscribe(
        (response) => {
          this.products = response;
          console.log(response);

        },
        (err) => {
          console.log(err);
        });

      
        /*this.service.createProduct(prd)
        .subscribe(
          (response) => {
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
