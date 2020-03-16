import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { ToastrService } from 'ngx-toastr';

export interface LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/style.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  loginForm: FormGroup;
  mailCtrl: FormControl = new FormControl();
  passwordCtrl: FormControl;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginInfo: any;
  canAuth: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public toastr: ToastrService,

  ) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "content";
  }

  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.loginWI1();

  }

  loginWI1() {

    if (this.loginForm.valid) {
      this.canAuth = true;
      this.loading = true;
      this.loginInfo = {
        email: this.loginForm.value.username,
        // password: this.loginForm.value.password
      };

      this.authService.getLogin(this.loginInfo)
        .subscribe(res => {
          if (res) {
            if (res.status === 200) {
              if (res.body.email === this.loginInfo.email) {
                console.log('user details ', res);
                this.loading = false;
                localStorage.setItem('currentUser', JSON.stringify(res.body));
                this.toastr.success('Welcome ' + res.body.name, '', { timeOut: 4000 });
                this.router.navigate([this.returnUrl]);
              } else {
                this.loading = false;
                this.canAuth = true;
                const msg = 'Email address is wrong! Not match with server.';
                // this.toastr.clear();
                this.toastr.error(msg, '', { timeOut: 4000 });
              }
            }
          }
        });
    } else {
      this.canAuth = false;
      this.loading = false;
    }
  }


  getErrorMessage() {
    return 'Invalid mail address';
  }
}
