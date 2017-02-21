import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'hero-message',
  template: `
    <h2>Async Hero Message and AsyncPipe</h2>
    <p>Message: {{ message$ | async }}</p>
    <button (click)="resend()">Resend</button>`,
    // 这个 Async 管道节省了组件的样板代码。 组件不用订阅这个异步数据源，
    // 而且不用在被销毁时取消订阅 ( 如果订阅了而忘了反订阅容易导致隐晦的内存泄露 ) 
})
export class HeroAsyncMessageComponent {
  message$: Observable<string>;

  private messages = [
    'You are my hero!',
    'You are the best hero!',
    'Will you be my hero?'
  ];

  constructor() { this.resend(); }

  resend() {
    this.message$ = Observable.interval(500)
      .map(i => this.messages[i])
      .take(this.messages.length);
  }
}

// Alternative message$ formula:
// this.message$ = Observable.fromArray(this.messages)
//   .map(message => Observable.timer(500).map(() => message))
//   .concatAll();

/**
 * # 非纯管道 AsyncPipe
 * Angular 的 AsyncPipe 是一个有趣的非纯管道的例子。 
 * AsyncPipe 接受一个 Promise 或 Observable 作为输入，并且自动订阅这个输入，最终返回它们给出的值。
 * 而且它是有状态的。 该管道维护着一个所输入的 Observable 的订阅，并且持续从那个 Observable 中发出新到的值。
 */

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/