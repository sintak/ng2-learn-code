import { Routes }         from '@angular/router';
import { AuthGuard }      from './auth-guard.service';
import { AuthService }    from './auth.service';
import { LoginComponent } from './login.component';

export const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

export const authProviders = [
  AuthGuard,
  AuthService
];

/**
 * 使用自己的routing文件
 */


/**
 * # 路由器
 * 当浏览器地址栏的 URL 变化时， 如果它匹配上了path路径(string) ，
 * 路由器就会创建或获取一个component实例，并显示它的视图。
 */


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/