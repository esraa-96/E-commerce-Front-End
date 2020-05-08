import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ProductService} from 'src/app/services/product.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Output() redirect:EventEmitter<any> = new EventEmitter();

  constructor(private service:ProductService,private router: Router,private authorize:AuthService) {}

  toCart(id)
  {
    console.log(`user added item number ${id} to the cart`)
    //this.router.navigate(['cart',id]);
  }    

  get admin() {
    if (this.authorize.getUserRole() == 'admin')
      return true;
    else
      return false;
  }

  ngOnInit(): void {
  
  }

  currentPrdId;
  GoToEdit(id)   
  {
    this.router.navigate(['admin/edit',id]);
    console.log(id);
    this.currentPrdId=id;
  }


  delete(id)
  {
    console.log(id);
    this.service.deleteProduct(id)
    .subscribe((response)=>{console.log(response)},(err)=>{console.log(err)});
    this.prd.isDeleted=true;
    window.location.reload();
  }

  @Input() prd ;
}

 