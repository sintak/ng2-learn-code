import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {
  AfterContentParentComponent,
  AfterContentComponent,
  ChildComponent
} from './after-content.component';

import {
  AfterViewParentComponent,
  AfterViewComponent,
  ChildViewComponent
} from './after-view.component';

import {
  CounterParentComponent,
  MyCounterComponent
} from './counter.component';

import {
  DoCheckParentComponent,
  DoCheckComponent
} from './do-check.component';

import {
  OnChangesParentComponent,
  OnChangesComponent
} from './on-changes.component';

import { PeekABooParentComponent } from './peek-a-boo-parent.component';
import { PeekABooComponent } from './peek-a-boo.component';

import { SpyParentComponent } from './spy.component';
import { SpyDirective } from './spy.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    AfterContentParentComponent,
    AfterContentComponent,
    ChildComponent,
    AfterViewParentComponent,
    AfterViewComponent,
    ChildViewComponent,
    CounterParentComponent,
    MyCounterComponent,
    DoCheckParentComponent,
    DoCheckComponent,
    OnChangesParentComponent,
    OnChangesComponent,
    PeekABooParentComponent,
    PeekABooComponent,
    SpyParentComponent,
    SpyDirective
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

/**
 * # 钩子 | 目的和时机
 * 
 * [constructor]
 * 
 * ngOnChanges	
 * 当 Angular （重新）设置数据绑定输入属性时响应。 该方法接受当前和上一属性值的 SimpleChanges 对象
 * 当被绑定的输入属性的值发生变化时调用，首次调用一定会发生在 ngOnInit 之前。
 * 
 * ngOnInit	
 * 在 Angular 第一次显示数据绑定和设置指令 / 组件的输入属性之后，初始化指令 / 组件。
 * 在第一轮 ngOnChanges 完成之后调用，只调用 一次 。
 * 
 * ngDoCheck	
 * 检测，并在发生 Angular 无法或不愿意自己检测的变化时作出反应。
 * 在每个 Angular 变更检测周期中调用， ngOnChanges 和 ngOnInit 之后。
 * 
 * ngAfterContentInit	
 * 当把内容投影进组件之后调用。
 * 第一次 NgDoCheck 之后调用，只调用一次。
 * 只适用于组件 。
 * 
 * ngAfterContentChecked	
 * 每次完成被投影组件内容的变更检测之后调用。
 * ngAfterContentInit 和每次 NgDoCheck 之后调用
 * 只适合组件 。
 * 
 * ngAfterViewInit	
 * 初始化完组件视图及其子视图之后调用。
 * 第一次 ngAfterContentChecked 之后调用，只调用一次。
 * 只适合组件 。
 * 
 * ngAfterViewChecked	
 * 每次做完组件视图和子视图的变更检测之后调用。
 * ngAfterViewInit 和每次 ngAfterContentChecked 之后调用。
 * 只适合组件 。
 * 
 * ngOnDestroy	
 * 当 Angular 每次销毁指令 / 组件之前调用并清扫。 在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏。
 * 在 Angular 销毁指令 / 组件之前调用。 
 */

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/