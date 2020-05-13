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

  canChange: boolean = false;
  id: String;

  user = {
    address: "",
    age: 0,
    email: "",
    firstName: "",
    gender: 0,
    lastName: "",
    phoneNumber: "",
    profilePhoto: ""
  };
  updatedUser = {
    address: "",
    age: 0,
    email: "",
    firstName: "",
    gender: 0,
    lastName: "",
    phoneNumber: "",
    profilePhoto: ""
  };

  rahaf = 'hello';


  createFrom = new FormGroup({
    firstNameStatus: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });

  constructor(private userService: UserService, private auth: AuthService) {

    // auth.login("Eman@example.com","Eman123@");
  }

  ngOnInit(): void {

    this.userService.getuserById(this.auth.getUserId()).subscribe(
      (resp: any) => {
        this.user = resp.user;
      },
      (err) => { }
    )
  }

  enableEdit() {
    this.canChange = true;
    this.updatedUser = { ...this.user };
  }

  disableEdit() {
    this.canChange = false;
  }

  updateFirstName(e) {
  }
  updateUser() {

    this.canChange = false;
  }
}
