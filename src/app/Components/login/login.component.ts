import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  invalidLogin: boolean;

  signIn() {
    this.auth.login('user@user.com', 'Ahmed!23')
      .subscribe(result => {
        if (result)
          this.router.navigate(['/']);
        else
          this.invalidLogin = true;
      });
  }

}
