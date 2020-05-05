import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  canChange:boolean=false;
  id:String;
  user:{"firstName":""};
  firstName=" ";
  
  

  createFrom = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    price: new FormControl('', [Validators.min(0), Validators.required]),
    });

  constructor(private userService:UserService,private auth:AuthService) {
    
    // auth.login("Eman@example.com","Eman123@");
   }

  ngOnInit() : void {
 
   this.id= this.auth.getUserId();
   if(this.id){
      this.getUser();
      console.log("after");
   }

    
  }

async getUser(){
   await this.userService.getuserById(this.id).toPromise().then(
      (Response)=>{console.log(Response["user"])
      this.user=Response["user"];
      this.firstName=this.user["firstName"];
       
    }).catch((err)=>console.log(err));
      console.log("before");
  }

}
