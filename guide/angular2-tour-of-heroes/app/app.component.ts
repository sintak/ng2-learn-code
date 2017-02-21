import { Component } from '@angular/core';
// import './rxjs-extensions';  // [移到app.module.ts中了？] 导入RxJS，以便让Observable支持debounceTime, distinctUntilChanged, switchMap等操作符

import { WOWHeroService } from './WOWHero.service';  // 提为模块

// import {CookieService} from 'angular2-cookie/core';

// import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Cookie } from './cookie'

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/wowheroes">WOWHeroes</a>
    </nav>
    <!-- Routed views go here -->
    <router-outlet></router-outlet>
    <button (click)="click1()">Cookie test</button>
  `,
  styleUrls: ['app/app.component.css']
  //providers: [ WOWHeroService ]

})
export class AppComponent {
  title = 'Tour of Heroes';

  // constructor(private _cookieService: CookieService) {
  //   //
  // }


// Cookie.set('cookieName', 'cookieValue');
// Cookie.set('cookieName', 'cookieValue', 10 /*days from now*/);
// Cookie.set('cookieName', 'cookieValue', 10, '/myapp/', 'mydomain.com', true /* https only */ );

// Cookie.check('cookieName'); 

// let myCookie = Cookie.get('cookieName');

// /*
// * List of cookies as Object, like: { cookieName: "cookieValue", cookieName2: "cookieValue2" ... etc }
// */
// let cookielist = Cookie.getAll();

// Cookie.delete('cookieName');
// Cookie.deleteAll();
  click1(): void {
    //
    Cookie.set('hello', 'world');
    let hello = Cookie.get('hello');
    alert(hello);
  }


}

/**
 * 不直接写<my-heroes></my-heroes>;
 * 把 <router-outlet> 标签添加到模板的底部。 
 * RouterOutlet 是 RouterModule 提供的 指令之一 。 
 * 当我们在应用中导航时，路由器就把激活的组件显示在 ` 里面。
 * Angular 路由器是一个可选的外部 Angular NgModule ，名叫 RouterModule 。 
 * 路由器包含了多种服务 (RouterModule) 、多种指令 (RouterOutlet, RouterLink, RouterLinkActive) 、 和一套配置 (Routes) 。
 */

