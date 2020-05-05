import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  // constructor(private notifyService : NotificationService) { }
  constructor(private service: ProductService, private modalService: NgbModal) {
  }
  ngOnInit(): void {

  }

  afterAdd: string;
  uploadImage: string = "choose Image";
  product;

  createFrom = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    price: new FormControl('', [Validators.min(0), Validators.required]),
    image: new FormControl('', this.imageValidator()),
    message: new FormControl('', Validators.maxLength(50)),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    catagory: new FormControl(''),
    discount: new FormControl('1', [Validators.max(100), Validators.min(1), Validators.required])

  });


  get catagory() {
    return this.createFrom.get('catagory');
  }

  get title() {
    return this.createFrom.get('title');
  }

  get price() {
    return this.createFrom.get('price');
  }

  get image() {
    return this.createFrom.get('image');
  }

  get message() {
    return this.createFrom.get('message');
  }

  get discount() {
    return this.createFrom.get('discount');
  }
  get quantity() {
    return this.createFrom.get('quantity');
  }

  imageValidator(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      var ext = /^.+\.([^.]+)$/.exec(control.value);

      let valid: boolean = false;
      if (ext != null && ext.length >= 2) {
        console.log(ext[0].split('\\'));
        const file = ext[0].split('\\');
        this.uploadImage = file[file.length - 1];
        if (ext[1] == "jpg" || ext[1] == 'jpeg' || ext[1] == 'png' || ext[1] == null)
          valid = true;

      }

      console.log(valid);
      return !valid ? { 'email': { value: control.value } } : null;
    };
  }

  open(content) {
    this.modalService.open(content);
  }


  Add(content) {
    console.log(this.image);
    console.log("ll");
    if (!this.title.invalid && !this.message.invalid && !this.quantity.invalid && !this.discount.invalid
      && !this.price.invalid// && !this.image.invalid
    ) {
      let product = {
        "productName": this.title.value,
        "unitPrice": this.price.value,
        "unitsInStock": this.quantity.value,
        "discount": this.discount.value,
        "category": this.catagory.value,
        "description": this.message.value,
        "isDeleted": false,
      }
      console.log(product);
      this.service.createProduct(product).
        subscribe((response) => {
          console.log(response);
          this.afterAdd = "successfull !";
          this.open(content);
        }, (err) => {
          console.log("jj");
          console.log(err);
          this.afterAdd = "Sever error !";
          this.open(content);
        })
    }
    else {
      this.afterAdd = "Please Enter Valid data!";
      this.open(content);
    }
  }

  uploadFinished(cc){
    
  }

}
