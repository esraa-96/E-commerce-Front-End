import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { product } from 'src/mapModules/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products;
  prdCategory;

  constructor(private service: ProductService, private active: ActivatedRoute, private router: Router,
    private authorize: AuthService) {
    this.prdCategory = this.active.snapshot.params["id"];
  }

  get admin() {
    if (this.authorize.getUserRole() == 'admin')
      return true;
    else
      return false;
  }

  newList;
  inputChanged(e) {
    this.service.getProductByName(e.target.value).subscribe(
      (response) => {
        this.newList = response;
        console.log(response);
      },
      (err) => {
        console.log(err);
      });
  }



  ngOnInit(): void {

    if (this.prdCategory == 10) {
      console.log(`prd cat ${this.prdCategory}`)
      this.service.getAllProducts()
        .subscribe(
          (response: any) => {
            this.products = response;
          },
          (err) => {
            console.log(err);
          });
    }
    else if (this.prdCategory == 0) {
      console.log(`prd cat ${this.prdCategory}`)
      this.service.getProductByCategory(0)
        .subscribe(
          (response) => {
            this.products = response;
            console.log(response);
          },
          (err) => {
            console.log(err);
          });
    }
    else if (this.prdCategory == 1) {
      console.log(`prd cat ${this.prdCategory}`)
      this.service.getProductByCategory(1)
        .subscribe(
          (response) => {
            this.products = response;
            console.log(response);
          },
          (err) => {
            console.log(err);
          });
    }
    else if (this.prdCategory == 2) {
      console.log(`prd cat ${this.prdCategory}`)
      this.service.getProductByCategory(2)
        .subscribe(
          (response) => {
            this.products = response;
            console.log(response);
          },
          (err) => {
            console.log(err);
          });
    }
    else {
      this.router.navigate['**']
    }
  }

  // prd = {
  //   "productID": 1,
  //   "productName": 'erap',
  //   "unitPrice": 10,
  //   "unitsInStock": 12,
  //   "discount": 23,
  //   "category": 1,
  //   "description": "jjj",
  //   "isDeleted": false,
  // }

}
