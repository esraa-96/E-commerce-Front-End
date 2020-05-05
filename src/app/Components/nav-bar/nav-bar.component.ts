import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  get isAdmin() {
    if (this.auth.getUserRole() == 'admin')
      return true;
    return false;
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }

}
