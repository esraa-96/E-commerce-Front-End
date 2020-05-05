import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {
  constructor(private myActive: ActivatedRoute, private service: ProductService, private modalService: NgbModal) {
    this.id = myActive.snapshot.params["id"];
    console.log(myActive.snapshot.params["id"]);
    console.log("da el id")
  }

  ngOnInit(): void {

    this.service.getProductById(this.id)
      .subscribe(
        (response) => {
          this.product = response;

          console.log(response);
          console.log('response------------');

          this.EditFrom = new FormGroup({
            title: new FormControl(this.product.productName, [Validators.required, Validators.maxLength(30)]),
            price: new FormControl(this.product.unitPrice, [Validators.min(0), Validators.required]),
            image: new FormControl('', this.imageValidator()),
            message: new FormControl(this.product.description, Validators.maxLength(50)),
            quantity: new FormControl(this.product.unitsInStock, [Validators.required, Validators.min(0)]),
            catagory: new FormControl(this.product.category),
            discount: new FormControl(this.product.discount, [Validators.max(100), Validators.min(1), Validators.required])

          });
        },
        (err) => {
          console.log(err);
        });
    console.log('+++++++++++');


  }

  product: any = {

  };


  uploadImage: string = "choose Image";

  EditFrom: FormGroup = new FormGroup({
    title: new FormControl(this.product.productName, [Validators.required, Validators.maxLength(30)]),
    price: new FormControl('0', [Validators.min(0), Validators.required]),
    image: new FormControl('', this.imageValidator()),
    message: new FormControl('', Validators.maxLength(50)),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    catagory: new FormControl(''),
    discount: new FormControl('0', [Validators.max(1), Validators.min(0), Validators.required])

  });
  // get catagory(){
  //   return this.EditFrom.get('catagory');
  // }

  id: any;
  get title() {
    return this.EditFrom.get('title');
  }
  set title(value) {
    this.EditFrom.controls.title.setValue(value);
  }

  get discount() {
    return this.EditFrom.get('discount');
  }

  set discount(value) {
    this.EditFrom.controls.discount.setValue(value);

  }
  get price() {
    return this.EditFrom.get('price');
  }

  get image() {
    return this.EditFrom.get('image');
  }

  get message() {
    return this.EditFrom.get('message');
  }

  get quantity() {
    return this.EditFrom.get('quantity');
  }

  get catagory() {
    return this.EditFrom.get('catagory');
  }


  //Validation
  imageValidator(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      var ext = /^.+\.([^.]+)$/.exec(control.value);

      let valid: boolean = false;
      if (ext != null && ext.length >= 2) {
        // console.log(ext[0].split('\\'));
        const file = ext[0].split('\\');
        this.uploadImage = file[file.length - 1];
        if (ext[1] == "jpg" || ext[1] == 'jpeg' || ext[1] == 'png')
          valid = true;

      }

      //  console.log(valid);
      return !valid ? { 'email': { value: control.value } } : null;
    };
  }
  open(content) {
    this.modalService.open(content);
  }
  //save Change Fun
  afterAdd: string;
  save(content) {

    console.log("ll");

    if (!this.title.invalid && !this.message.invalid && !this.quantity.invalid && !this.discount.invalid
      && !this.price.invalid// && !this.image.invalid
   ) {
      let product = {
        "productID": this.id,
        "productName": this.title.value,
        "unitPrice": this.price.value,
        "unitsInStock": this.quantity.value,
        "discount": this.discount.value,
        "category": this.catagory.value,
        "description": this.message.value,
        "isDeleted": false,
      
      }
      console.log(product);
      this.service.editProduct(this.id, product).
        subscribe((response) => {
          console.log("edit-----lll--")
          console.log(this.product);
          console.log("edit-------")
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

}
