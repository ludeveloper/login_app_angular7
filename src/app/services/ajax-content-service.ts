import { Injectable } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I1, I2 } from './interceptors';
import { HttpInterceptorHandler } from './interceptor-handler';



@Injectable({ providedIn: 'root' })
export class AjaxContentService {
  apiURL = 'http://api.cdnjs.com/libraries';
  result: any;


  constructor(
    private http: HttpClient,
    private backend: HttpXhrBackend) {
  }


  getContentByFilter(params?: string): Observable<any> {
    console.log('Of course I still love you. Lu');
    const req = new HttpRequest('GET', this.apiURL + params);
    const handler = new HttpInterceptorHandler(this.backend, new I2());
    const res = handler.handle(req);
    return res;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
