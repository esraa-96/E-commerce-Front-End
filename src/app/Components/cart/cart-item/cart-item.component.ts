import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor() { }

  showDesc: boolean = false;

  @Input() item: any;

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
    console.log('remove clicked!');
  }
  toggleDescription() {
    this.showDesc = !this.showDesc;
  }
}
