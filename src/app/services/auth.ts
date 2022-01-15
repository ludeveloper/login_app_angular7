import { Injectable } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I1, I2 } from './interceptors';
import { HttpInterceptorHandler } from './interceptor-handler';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface UserModel {
    email: string;
    // password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    public currentUser: Observable<any>;
    apiURL = 'https://jsonplaceholder.typicode.com/users/1';
    response: Observable<any>;
    result: any;

    constructor(
        private http: HttpClient,
        private backend: HttpXhrBackend,
        public jwthelper: JwtHelperService
    ) {
    }

    public isAuthecticated(): boolean {
        const user = localStorage.getItem('currentUser');
        if (user) {
            return true
        } else {
            return false
        }
    }

    getLogin(email: string): Observable<any> {
        console.log('do you think you are a hero. Lu');
        const req = new HttpRequest('GET', this.apiURL);
        const handler = new HttpInterceptorHandler(this.backend, new I1());
        const res = handler.handle(req);
        return res;
    }


    logout() {
        // to logout
        localStorage.removeItem('currentUser');
    }
}
