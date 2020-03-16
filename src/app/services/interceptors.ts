import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class I1 implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //const modified = req.clone({ setHeaders: { 'Custom-Header-1': '1' } });
    const modified = req.clone({
      setHeaders: {
        // Authorization: this.getCurrentToken(),
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    return next.handle(modified);
  }
  getCurrentToken() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('tokenType') + ' ' + localStorage.getItem('token');
    } else {
      // tslint:disable-next-line: max-line-length
      const str = 'Bearer portekey';
      return str;
    }
  }
}

@Injectable()
export class I2 implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modified = req.clone({
    });
    return next.handle(modified);
  }

  getCurrentToken() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('tokenType') + ' ' + localStorage.getItem('token');
    } else {
      // tslint:disable-next-line: max-line-length
      const str = 'Bearer portekey';
      return str;
    }
  }
}
