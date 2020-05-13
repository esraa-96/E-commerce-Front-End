import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { product } from 'src/mapModules/product';

@Component({
  selector: 'app-arrival-carousel',
  templateUrl: './arrival-carousel.component.html',
  styleUrls: ['./arrival-carousel.component.css']
})
export class ArrivalCarouselComponent implements OnInit {

  AllProducts;

  constructor(private service: ProductService) { }


  ngOnInit(): void {
    this.service.getAllProducts()
      .subscribe(
        (response) => {
          this.AllProducts = response;
        },
        (err) => {
        });
  }


  imgs = [];
  counter = 0;
  imageSrc = this.imgs[0];
  Nclick() {
    this.counter++
    if (this.counter > 3)
      this.counter = 0;
    this.imageSrc = this.imgs[this.counter];

  }
  Pclick() {
    this.counter--
    if (this.counter < 0)
      this.counter = 3;
    this.imageSrc = this.imgs[this.counter];

  }

}
