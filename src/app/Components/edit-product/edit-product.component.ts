import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
description:string="ted humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lor";

  uploadImage: string = "choose Image";
  EditFrom = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    price: new FormControl('0', [Validators.min(0), Validators.required]),
    image: new FormControl('', this.imageValidator()),
    message: new FormControl('ddddd', Validators.maxLength(50)),
    quantity: new FormControl('2', [Validators.required, Validators.min(0)]),
    //catagory:new FormControl('1'),

  });
 
  // get catagory(){
  //   return this.EditFrom.get('catagory');
  // }

 
  get title() {
    return this.EditFrom.get('title');
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



//Validation
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

  //save Change Fun
  Add() {
    console.log(this.title);
    // console.log(this.description);

  }

}
