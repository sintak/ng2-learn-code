import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  // template: '<h1 highlight>{{title}}</h1>',
  template: `
    <app-title [subtitleTarget]="subtitle"></app-title>
    <nav>
      <a routerLink="contact" routerLinkActive="active">Contact</a>
      <a routerLink="crisis"  routerLinkActive="active">Crisis Center</a>
      <a routerLink="heroes"  routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
    `,  // []= 组件间通讯
})
export class AppComponent {
  // title = 'Minimal NgModule';
  subtitle = '(v1.0.3)';
}
