import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, NG_VALIDATORS } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  invalidLogin: boolean;

  constructor(private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [
        Validators.required,
        // Validators.pattern('^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$'),
        Validators.email]],
      password: ['', Validators.required]
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.form.controls;
  }


  signIn() {
    this.submitted = true;

    if (this.form.invalid)
      return;

    this.loading = true;

    this.auth.login(this.f.username.value, this.f.password.value)
      // .pipe(first())
      .subscribe(result => {
        if (result)
          this.router.navigate([this.returnUrl]);
        else {
          console.log('failed login');
          this.invalidLogin = true;
          this.loading = false;
        }
      },
        err => {
          console.log(err);
          console.log('failed login222222');
          this.invalidLogin = true;
          this.loading = false;
        });
  }

}
