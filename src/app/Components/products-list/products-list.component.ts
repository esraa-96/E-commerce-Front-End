import { Component, OnInit} from '@angular/core';
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

  constructor(private service: ProductService,private active:ActivatedRoute,private router:Router,
  private authorize : AuthService)
  {
    this.prdCategory=this.active.snapshot.params["id"];
  }

  get admin() {
    if (this.authorize.getUserRole() == 'admin')
      return true;
    else
      return false;
  }
  ngOnInit(): void {
    if(this.prdCategory==10)
    {
      console.log(`prd cat ${this.prdCategory}`)
      this.service.getAllProducts()
      .subscribe(
        (response) => {
          this.products = response;
          console.log(response);
        },
        (err) => {
          console.log(err);
        });
    }
    else if(this.prdCategory==0)
    {
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
    else if(this.prdCategory==1)
    {
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
    else if(this.prdCategory==2)
    {
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
    else 
    {
      this.router.navigate['**']
    }

        

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

  prd = {
    "productID": 1,
    "productName": 'erap',
    "unitPrice": 10,
    "unitsInStock": 12,
    "discount": 23,
    "category": 1,
    "description": "jjj",
    "isDeleted": false,
  }

}
