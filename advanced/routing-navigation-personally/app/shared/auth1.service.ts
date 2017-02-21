import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class Auth1Service {
    isLoggedIn: boolean = false;

    // 验证登录后重定位到此地址
    redirectUrl: string;  // 在登录检查的时候设置此Url，使用登录的地址

    login(): Observable<boolean> {
        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}