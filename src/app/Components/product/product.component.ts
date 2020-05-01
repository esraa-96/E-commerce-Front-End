import { Component, OnInit, Input } from '@angular/core';
import {ProductService} from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private service:ProductService) { }

  ngOnInit(): void {
  }


  delete(id)
  {
    console.log(id);
    this.service.deleteProduct(id)
    .subscribe((response)=>{console.log(response)},(err)=>{console.log(err)});
    this.prd.isDeleted=true;
  }

  @Input() prd ;
}

 