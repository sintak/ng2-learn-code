import {
  Component, Input,
  OnChanges, SimpleChange,
} from '@angular/core';

import { LoggerService }  from './logger.service';

@Component({
  selector: 'my-counter',
  template: `
  <div class="counter">
    Counter = {{counter}}

    <h5>-- Counter Change Log --</h5>
    <div *ngFor="let chg of changeLog" mySpy>{{chg}}</div>
  </div>
  `,
  styles: ['.counter {background: LightYellow; padding: 8px; margin-top: 8px}']
})
export class MyCounterComponent implements OnChanges {
  @Input() counter: number;
  changeLog: string[] = [];

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {

    // Empty the changeLog whenever counter goes to zero
    // hint: this is a way to respond programmatically to external value changes.
    if (this.counter === 0) {
      this.changeLog.length = 0;
    }

    // A change to `counter` is the only change we care about
    let chng = changes['counter'];
    let cur = chng.currentValue;
    let prev = JSON.stringify(chng.previousValue); // first time is {}; after is integer
    this.changeLog.push(`counter: currentValue = ${cur}, previousValue = ${prev}`);
  }

}

/***************************************/

@Component({
  selector: 'counter-parent',
  template: `
   <div class="parent">
    <h2>Counter Spy</h2>

    <button (click)="updateCounter()">Update counter</button>
    <button (click)="reset()">Reset Counter</button>

    <my-counter [counter]="value"></my-counter>

    <h4>-- Spy Lifecycle Hook Log --</h4>
    <div *ngFor="let msg of spyLog">{{msg}}</div>
   </div>
  `,
  styles: ['.parent {background: gold;}'],
  providers: [LoggerService]
})
export class CounterParentComponent {
  value: number;
  spyLog: string[] = [];

  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
    this.spyLog = logger.logs;
    this.reset();
  }

  updateCounter() {
    this.value += 1;
    this.logger.tick();
  }

  reset() {
    this.logger.log('-- reset --');
    this.value = 0;
    this.logger.tick();
  }
}

/**
 * 演示了组件和指令的组合，它们各自有自己的钩子。
 * 在这个例子中，每当父组件递增它的输入属性 counter 时， CounterComponent 就会通过 ngOnChanges 记录一条变更。
 * 同时，我们还把前一个例子中的 SpyDirective 用在 CounterComponent 上，来提供日志，可以同时观察到日志的创建和销毁过程。
 */

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/