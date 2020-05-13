import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor(private cartservice: CartService) { }

  showDesc: boolean = false;
  isRemoved: boolean = false;

  @Input() item: any;

  @Output() removeItemEvent = new EventEmitter();

  ngOnInit(): void {
  }

  plusOne() {
    //update in cart service
    if (this.item.product.unitsInStock > this.item.numberOfItems) {
      this.item.numberOfItems++;
    }
  }
  minusOne() {
    //update in cart service
    if (this.item.numberOfItems > 1) {
      this.item.numberOfItems--;
    }
  }
  removeItem() {
    this.cartservice.removeFromCart(this.item).subscribe
      (
        (res) => {
          this.isRemoved = true;
          this.removeItemEvent.emit(this.item);
        }, (err) => {
          this.isRemoved = false;
        });

  }
  toggleDescription() {
    this.showDesc = !this.showDesc;
  }
}
