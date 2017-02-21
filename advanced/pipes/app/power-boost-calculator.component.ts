import { Component } from '@angular/core';

@Component({
  selector: 'power-boost-calculator',
  template: `
    <h2>Power Boost Calculator</h2>
    <div>Normal power: <input [(ngModel)]="power"></div>
    <div>Boost factor: <input [(ngModel)]="factor"></div>
    <p>
      Super Hero Power: {{power | exponentialStrength: factor}}
    </p>
  `
})
export class PowerBoostCalculatorComponent {
  power = 5;
  factor = 1;
}

/**
 * # 管道与变更检测
 * Angular 通过 变更检测 过程来查找绑定值的更改，并在每一次 JavaScript 事件之后运行：每次按键、
 * 鼠标移动、定时器以及服务器的响应。 这可能会让变更检测显得很昂贵，但是 Angular 会尽可能降低变更检测的成本。
 */

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/