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
    private orderService : OrderService) { }

  ngOnInit(): void {
    this.cartService.getUserCartByUserId(this.auth.getUserId()).
      subscribe
      ((response) => {
        this.cart = response;
        this.loadPage = true;
      }, (error) => {
        console.log(error);
      });
  }

  private async submitOrder() {
    // Submit the order to database
    for (let i = 0; i < this.cart.orderDetails.length; i++) {
      // console.log(this.cart.orderDetails[i]);
     await this.cartService.changeQuantity(this.cart.orderDetails[i]).toPromise()
     .then((res)=>{
      console.log('quantity changed successfully');
     }).catch((err)=>{
      console.log('quantity changed failed!');
     });
   
    }
    //submit
   await this.orderService.submitOrder(this.cart.orderId).toPromise()
   .then((res)=>{
     console.log(res);
    console.log('submit  successfully');
   }).catch((err)=>{
     console.log(err);
    console.log('submit  failed!');
   });

    // Handel getting the new cart
    this.cartService.getUserCartByUserId(this.auth.getUserId())
      .subscribe
      ((response) => {
       
        localStorage.setItem('cart', response["orderId"]);
        this.cart = response;
        this.loadPage = true;
      }, (err) => {
        console.log(err);
      });
  }


  openConfirmationDialog() {
    this.confirmationDialogService.confirm('Confirm', 'Are you sure you want to submit your order?', 'Submit', 'Back')
      .then((confirmed) => {
        if (confirmed)
          this.submitOrder();
      })
      .catch(() => {
        //console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
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


  removeItemFromDetails(event)
  {
    console.log(event);
    console.log("removeItemEvent");
    // debugger;
    this.cart.orderDetails = this.cart.orderDetails.filter(o=>o.productId != event.productId);
  }
}
