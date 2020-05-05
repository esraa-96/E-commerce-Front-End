import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:ProductService,private router:Router) 
  {

  }
  ngOnInit(): void {}


  MenCategory(id)
  {
    this.router.navigate(['admin/products',id]);
  }
   WomenCategory(id)
   {
     this.router.navigate(['admin/products',2]);
   }
   KidsCategory(id)
   {
     this.router.navigate(['admin/products',3]);
   }
  
}
