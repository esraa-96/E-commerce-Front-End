import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;
  loadPage: boolean = false;
  constructor(private confirmationDialogService: ConfirmationDialogService,
    private cartService: CartService,
    private auth: AuthService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.cartService.getUserCartByUserId(this.auth.getUserId()).
      subscribe
      ((response) => {
        this.cart = response;
        this.loadPage = true;
      }, (error) => {
      });
  }

  private async submitOrder() {
    // Submit the order to database
    for (let i = 0; i < this.cart.orderDetails.length; i++) {
      await this.cartService.changeQuantity(this.cart.orderDetails[i]).toPromise()
        .then((res) => {
        }).catch((err) => {
        });

    }
    //submit
    await this.orderService.submitOrder(this.cart.orderId).toPromise()
      .then((res) => {
      }).catch((err) => {
      });

    // Handel getting the new cart
    this.cartService.getUserCartByUserId(this.auth.getUserId())
      .subscribe
      ((response) => {

        localStorage.setItem('cart', response["orderId"]);
        this.cart = response;
        this.loadPage = true;
      }, (err) => {
      });
  }


  openConfirmationDialog() {
    this.confirmationDialogService.confirm('Confirm', 'Are you sure you want to submit your order?', 'Submit', 'Back')
      .then((confirmed) => {
        if (confirmed)
          this.submitOrder();
      })
      .catch(() => {
      });
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


  removeItemFromDetails(event) {
    this.cart.orderDetails = this.cart.orderDetails.filter(o => o.productId != event.productId);
  }
}
