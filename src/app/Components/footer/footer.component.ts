import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private authorize: AuthService) { }

  get IsLoggedIn() {
    if (this.authorize.isLoggedIn())
      return true;
    else
      return false;
  }
  get IsAdmin() {
    if (this.authorize.getUserRole() == 'admin')
      return true;
    else
      return false;
  }

  ngOnInit(): void {
  }

}
