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
      },
      (err) => {
      });
  }



  ngOnInit(): void {

    if (this.prdCategory >= 0 && this.prdCategory < 3) {
      if (!this.authorize.isLoggedIn())
        this.router.navigate(['login']);
      else
        this.service.getProductByCategory(this.prdCategory)
          .subscribe(
            (response) => {
              this.products = response;
            },
            (err) => {
            });
    }
    else {
      this.service.getAllProducts()
        .subscribe(
          (response: any) => {
            this.products = response;
          },
          (err) => {
          });
    }
  }

}
