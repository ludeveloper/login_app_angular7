import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'porteApp';
  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) { }

  Logout() {
    localStorage.clear();
    this.toastr.success('Logged out', '', { timeOut: 4000 });
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
