import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UploadService } from "src/app/services/upload.service";
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {

  //attribute
  EditFrom: FormGroup = new FormGroup({
    productID:new FormControl(''),
    productName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    unitPrice: new FormControl('', [Validators.min(0), Validators.required]),
    photo: new FormControl(''),
    description: new FormControl('', Validators.maxLength(50)),
    unitsInStock: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl(''),
    discount: new FormControl('', [Validators.max(100), Validators.min(0), Validators.required])

  });
  product: any = {};
  uploadImage: string = "choose Image";
  id: any;
  pageLoaded: boolean = false;

  public progress: number;
  public message: string = "";
  afterAdd: string;
  loading;
  productID;
  fileImage=null;
  validEx=["image/png","image/jpeg","image/gif"];
  validImage=true;
  productImages:any[];
  urlServer="http://localhost:3104/";
  imgAddFlag:boolean=true;
  //===================================

  //ctor
  constructor(private myActive: ActivatedRoute,
    private service: ProductService, private modalService: NgbModal,private upload: UploadService) {
    this.id = myActive.snapshot.params["id"];
    console.log(myActive.snapshot.params["id"]);
    console.log("da el id")
  }
  //====================================

  //init
  ngOnInit(): void {

    this.getProductById(this.id);

  }
  //=================================

  //functions
  get f() { return this.EditFrom.controls; }

  getProductById(id) {
    this.service.getProductById(id)
      .subscribe(
        (response) => {
          this.product = response;
          console.log(response);
          console.log('response------------');

         this.productImages = response["image"];
         console.log(response["image"]["length"] )
        // debugger;
          if(response["image"]["length"]==0)
          {

            this.imgAddFlag=false;
          }
          else
          {
            this.imgAddFlag=true;
          }
        //  console.log(response["image"][0]["imagePath"]);

          this.pageLoaded = true;
          this.updateFormData(this.product);

        },
        (err) => {
          console.log(err);
        });
  }

  updateFormData(product: object) {
    this.EditFrom.setValue({
      productName: product["productName"],
      unitPrice: product["unitPrice"],
      unitsInStock: product["unitsInStock"],
      description: product["description"],
      discount: product["discount"]*100,
      category:product["category"],
      photo:"",
      productID:this.id
     
    });

  }

  open(content) {
    this.modalService.open(content);
  }

  ValidateImage(imageURl){
    if(imageURl&&this.validEx.includes(imageURl[0]["type"]))
    {
      this.validImage=true;
      return true;
    }
    this.validImage=false;
    return false;
  
}


  ImageUploader(files,content) {
    console.log("kkk");
    if( this.ValidateImage(files))
    {
    this.fileImage=files;
    }
    this.SaveImage(content);
   
    
   }


 
  public SaveImage(content){
    if(this.fileImage==null)return;
     this.upload.uploadFile(this.fileImage).subscribe
     (event => {
       if (event.type === HttpEventType.UploadProgress)
         this.progress = Math.round(100 * event.loaded / event.total);
       else if (event.type === HttpEventType.Response) {
         this.message = 'Upload success.';
         debugger;
         let body = event.body;
         this.f.photo.setValue(body["dbPath"])    
         console.log(this.f.photo.value);
         this.addImageIntoProduct(content);
       }
     },
     error=>{
       this.fileImage=null;
 
     }
     );
   }

   
   addImageToProduct(){
    let PrdImage={
      "productID":this.id,
      "imagePath": this.f.photo.value
       }
       return this.service.addImage(PrdImage);
     }


   addImageIntoProduct(content){
    this.addImageToProduct().toPromise()
    .then((Response)=>{
     this.afterAdd = "successfull !";
     this.open(content);
    //  this.loading = false;
    //console.log(this.f.photo.value);
     console.log("------respose");
     console.log(Response);
     this.imgAddFlag=true;
    this.productImages.push(Response);//-----------------
    console.log(this.productImages);
    }).catch((error=>{
     console.log(error);
     this.afterAdd = "Image  error !";
     this.open(content);
    //  this.loading = false;
    }))
   }
  deleteImageToProduct(path){
      let PrdImage={
        "productID":this.id,
        "imagePath":path
         }

         return this.service.deleteImage(PrdImage);
       }





  
  delete(path,content){
     console.log(path);
    this.deleteImageToProduct(path).toPromise()
    .then((Response)=>{
     this.afterAdd = "successfull !";
     this.open(content);
    //  this.loading = false;
    this.productImages=[];//--------------=====================
    this.imgAddFlag=false;
    }).catch((error=>{
     console.log(error);
     this.afterAdd = "can't delete  !";
     this.open(content);
    //  this.loading = false;
    }))
   }



  updateProduct(content){
    this.f.discount.setValue(this.f.discount.value/100);
    this.service.editProduct(this.id,this.EditFrom.value)
    .toPromise().then((Response)=>{
   
      this.afterAdd = "successfull !";
      this.loading=false;
      this.open(content);

    }).catch((error)=>{
      console.log(error);
      this.afterAdd = "Sever error !";
      this.open(content);
      this.loading = false;
    });
  }

  public save(content) {
    console.log("save======")
    debugger;
     //for button
     console.log(this.f);
     if (this.EditFrom.invalid) {
       this.afterAdd = "Please Enter Valid data!";
       this.open(content);
       this.loading=false;
       return;
 
     }
    //if success
     this.loading = true;
     console.log(this.EditFrom.value);
     this.updateProduct(content);
     
 
   }
  }
 
  