import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor(private cartservice:CartService) { }

  showDesc: boolean = false;
  isRemoved:boolean=false;

  @Input() item: any;
  
  @Output()removeItemEvent=new EventEmitter();

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
    this.cartservice.removeFromCart(this.item).subscribe
      (
        (res)=>{
          console.log("successfully");
          this.isRemoved=true;
          console.log(res);
        this.removeItemEvent.emit(this.item);
      },(err)=>{
         console.log("failed!");
         this.isRemoved=false;
         console.log(err);
      });
    
  }
  toggleDescription() {
    this.showDesc = !this.showDesc;
  }
}
