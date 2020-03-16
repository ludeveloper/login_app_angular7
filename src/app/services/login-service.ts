import { Injectable } from '@angular/core';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { HttpInterceptorHandler } from '../services/auth/interceptor-handler';
// import { I1, I2 } from '../services/auth/interceptors';

export interface UserModel {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  response: Observable<any>;
  result: any;
  userToken: any;
  apiURL = 'https://jsonplaceholder.typicode.com/users/1';

  constructor(
    // private backend: HttpXhrBackend,
    private httpClient: HttpClient
  ) { }

  // Login User
  public Login(user: UserModel) {
    debugger;
    // this.result = this.httpClient.post(`${this.apiURL}`, user);
    fetch(this.apiURL)
      .then(response => {
        response.json()
      })
      .then(json => {
        console.log(json)
        this.result = json; 


        if (this.result) {
          return this.result;
        } else {
          console.error(this.result);
          return console.error('An error occured');
        }
      })
  }

  // getCurrentToken() {
  //   if (localStorage.getItem('token')) {
  //     return localStorage.getItem('tokenType') + ' ' + localStorage.getItem('token');
  //   } else {

  //     const str = null;
  //     return str;
  //   }
  // }

  // use for all table data
  // public getAll(): Observable<any> {
  //   const req = new HttpRequest('POST', this.apiURL + '/User/Search', {});
  //   const handler = new HttpInterceptorHandler(this.backend, new I2());
  //   return handler.handle(req);
  // }

  // // Get person by ID
  // public getUserDetailById(id: number) {
  //   return this.httpClient.get(`${this.apiURL}/User/${id}`);
  // }
}
