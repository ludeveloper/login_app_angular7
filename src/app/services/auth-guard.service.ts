
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth';

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(
    public router: Router,
    public toastr: ToastrService,
    public authService: AuthService
  ) { }

  canActivate(): boolean {
    if (!this.authService.isAuthecticated()) {
      this.router.navigate(['login']);
      this.toastr.info('Please login first!', '', { timeOut: 4000 });
      return false;
    }
    return true;
  }
}