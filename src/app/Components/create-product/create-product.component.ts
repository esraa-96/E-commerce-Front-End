import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { NotificationService } from 'src/app/Components/services/notification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  uploadImage: string = "choose Image";
  product;

  createFrom = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    price: new FormControl('', [Validators.min(0), Validators.required]),
    image: new FormControl('', this.imageValidator()),
    message: new FormControl('', Validators.maxLength(50)),
    quantity: new FormControl('', [Validators.required, Validators.min(0)])

  });


  // constructor(private notifyService : NotificationService) { }
  constructor(private toastr: ToastrService) { }
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
        if (ext[1] == "jpg" || ext[1] == 'jpeg' || ext[1] == 'png')
          valid = true;

      }

      console.log(valid);
      return !valid ? { 'email': { value: control.value } } : null;
    };
  }

  ngOnInit(): void {
  }
  Add() {
    console.log(this.title);
    debugger;
    //  this.notifyService.showError("Data shown successfully !!", "ItSolutionStuff.com")
    this.toastr.success("message", "title")
  }

}
