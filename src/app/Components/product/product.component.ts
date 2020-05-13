import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Output() redirect: EventEmitter<any> = new EventEmitter();

  constructor(private service: ProductService,
    private router: Router,
    private authorize: AuthService,
    private confirmationDialogService: ConfirmationDialogService,
    private cartService: CartService) { }


  ngOnInit(): void {
    if (this.prd.unitsInStock == 0)
      this.inStock = false;
    if (!this.authorize.isLoggedIn() || this.authorize.getUserRole() == "admin")
      return;
    this.cartService.getUserCartByUserId(this.authorize.getUserId())
      .subscribe((resp) => {
        resp['orderDetails'].forEach(element => {
          if (element['productId'] == this.prd.productID) {
            this.isAdded = true;
          }
        });
      },
        (error) => { });

  }

  inStock: boolean = true;
  // urlServer = "http://localhost:3104/";
  urlServer = 'https://sdera.azurewebsites.net/';

  isAdded: boolean = false;


  toCart(productId) {
    this.isAdded = true;
    let cartId = this.cartService.getCartId()
    if (!cartId) {
      this.cartService.getUserCartByUserId(this.authorize.getUserId())
        .subscribe
        ((response) => {

          localStorage.setItem('cart', response["orderId"]);
          this.addToCartByService(productId, response["orderId"]);
        }, (err) => {
        });
    }
    else {
      this.addToCartByService(productId, cartId);
    }

  }


  addToCartByService(productId, cartId) {
    let OrderDetail = {
      "productId": productId,
      "orderId": cartId,
      "numberOfItems": 1
    };
    this.cartService.addToCart(OrderDetail).subscribe
      ((response) => {
      }, (error) => {
      })

  }


  get admin() {
    if (this.authorize.getUserRole() == 'admin')
      return true;
    else
      return false;
  }
  get isLoggedIn() {
    return this.authorize.isLoggedIn();
  }

  avaialable() {
    if (this.prd.unitsInStock == 0)
      return false;
    else
      return true;
  }

  openConfirmationDialog(id) {
    this.confirmationDialogService.confirm('Delete Product', 'Are you sure you want to delete this product?', 'Delete', 'Back')
      .then((confirmed) => {
        if (confirmed)
          this.delete(id);
      })
      .catch(() => {
      });
  }

  GoToEdit(id) {
    this.router.navigate(['admin/edit', id]);
  }


  delete(id) {
    this.service.deleteProduct(id)
      .subscribe((response) => { }, (err) => { });
    this.prd.isDeleted = true;
    // window.location.reload();
  }

  @Input() prd;
}

