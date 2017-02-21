import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

/**
 * # 验证服务类
 * 保存是否已登录的数据
 * （问：设计上是不是可以把cookie数据也保存到这个类就行了呢？
 *   答：还是保存到cookie里好，然后这个类管理cookie数据，这样就算关闭浏览器也能保存一些数据）
 */
@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    // of(values: ...T, scheduler: Scheduler): Observable<T>
    //  Creates an Observable that emits some values you specify as arguments, immediately one after the other, 
    //  and then emits a complete notification.

    // delay(delay: number | Date, scheduler: Scheduler): Observable
    //  Delays the emission of items from the source Observable by a given timeout or until a given Date.

    // do(nextOrObserver: Observer | function, error: function, complete: function): Observable
    //  Perform a side effect for every emission on the source Observable, 
    //  but return an Observable that is identical to the source.
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/