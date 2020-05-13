import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from 'src/app/services/product.service';
import { UploadService } from "src/app/services/upload.service";
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  //attribute  
  public progress: number;
  public message: string = "";
  afterAdd: string;
  uploadImage: string = "choose Image";
  product;
  loading;
  productID;
  fileImage = null;
  validEx = ["image/png", "image/jpeg", "image/gif"];
  validImage = false;
  // constructor(private notifyService : NotificationService) { }

  //ctor
  constructor(private service: ProductService, private modalService: NgbModal, private upload: UploadService) {
  }
  ngOnInit(): void { }

  //Validation

  createFrom = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    unitPrice: new FormControl('', [Validators.min(0), Validators.required]),
    photo: new FormControl(''),
    description: new FormControl('', Validators.maxLength(50)),
    unitsInStock: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl(''),
    discount: new FormControl('', [Validators.max(100), Validators.min(0), Validators.required])

  });


  //methods

  ValidateImage(imageURl) {
    if (imageURl && this.validEx.includes(imageURl[0]["type"])) {
      this.validImage = true;
      return true;
    }
    this.validImage = false;
    return false;

  }

  get f() { return this.createFrom.controls; }



  open(content) {
    this.modalService.open(content);
  }


  ImageUploader(files) {
    if (this.ValidateImage(files)) {
      this.fileImage = files;
    }

  }

  public async SaveImage() {
    if (this.fileImage == null) return;
    await this.upload.uploadFile(this.fileImage).toPromise().then
      ((event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          let body = event.body;
          this.f.photo.setValue(body["dbPath"])

        }
      }).catch(
        error => {
          this.fileImage = null;
        }
      );
  }

  public async Add(content) {
    debugger;
    if (this.createFrom.invalid || !this.validImage) {
      this.afterAdd = "Please Enter Valid data!";
      this.open(content);
      this.loading = false;
      return;

    }
    //if success
    this.loading = true;

    //saveImage
    if (!this.fileImage) return;
    await this.SaveImage();
    if (!this.fileImage) return;
    this.createProduct(content);


  }



  createProduct(content) {
    this.f.discount.setValue(this.f.discount.value / 100);
    this.service.createProduct(this.createFrom.value)
      .toPromise().then((Response) => {

        //add image
        this.addImageToProduct(Response).toPromise()
          .then((Response) => {
            this.afterAdd = "successfull !";
            this.open(content);
            this.loading = false;
          }).catch((error => {
            this.afterAdd = "Image  error !";
            this.open(content);
            this.loading = false;
          }))
      }).catch((error) => {
        this.afterAdd = "Sever error !";
        this.open(content);
        this.loading = false;
      });
  }


  addImageToProduct(Response) {
    let PrdImage = {
      "productID": Response["productID"],
      "imagePath": this.f.photo.value

    }

    return this.service.addImage(PrdImage);

  }




  // Add(content) {
  //   console.log(this.image);
  //   console.log("ll");
  //   if (!this.title.invalid && !this.message.invalid && !this.quantity.invalid && !this.discount.invalid
  //     && !this.price.invalid// && !this.image.invalid
  //   ) {
  //     let product = {
  //       "productName": this.title.value,
  //       "unitPrice": this.price.value,
  //       "unitsInStock": this.quantity.value,
  //       "discount": this.discount.value,
  //       "category": this.catagory.value,
  //       "description": this.message.value,
  //       "isDeleted": false,
  //     }
  //     console.log(product);
  //     this.service.createProduct(product).
  //       subscribe((response) => {
  //         console.log(response);
  //         this.afterAdd = "successfull !";
  //         this.open(content);
  //       }, (err) => {
  //         console.log("jj");
  //         console.log(err);
  //         this.afterAdd = "Sever error !";
  //         this.open(content);
  //       })
  //   }
  //   else {
  //     this.afterAdd = "Please Enter Valid data!";
  //     this.open(content);
  //   }
  // }


}




  // get catagory() {
  //   return this.createFrom.get('catagory');
  // }

  // get title() {
  //   return this.createFrom.get('title');
  // }

  // get price() {
  //   return this.createFrom.get('price');
  // }

  // get image() {
  //   return this.createFrom.get('image');
  // }

  // get message() {
  //   return this.createFrom.get('message');
  // }

  // get discount() {
  //   return this.createFrom.get('discount');
  // }
  // get quantity() {
  //   return this.createFrom.get('quantity');
  // }



  // imageValidator(): ValidatorFn {

  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     var ext = /^.+\.([^.]+)$/.exec(control.value);

  //     let valid: boolean = false;
  //     if (ext != null && ext.length >= 2) {
  //       console.log(ext[0].split('\\'));
  //       const file = ext[0].split('\\');
  //       this.uploadImage = file[file.length - 1];
  //       if (ext[1] == "jpg" || ext[1] == 'jpeg' || ext[1] == 'png' || ext[1] == null)
  //         valid = true;

  //     }

  //     console.log(valid);
  //     return !valid ? { 'email': { "error":"LL" } } : null;
  //   };
  // }
