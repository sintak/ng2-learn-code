import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RestoreService } from './restore.service';
import { Hero } from './hero';
@Component({
  selector: 'hero-editor',
  providers: [RestoreService],
  template: `
    <div>
      <span>Name:</span>
      <input [(ngModel)]="hero.name"/>
      <div>
        <button (click)="onSaved()">save</button>
        <button (click)="onCanceled()">cancel</button>
      </div>
    </div>`
})
export class HeroEditorComponent {
  @Output() canceled = new EventEmitter();
  @Output() saved = new EventEmitter();
  constructor(private restoreService: RestoreService<Hero>) {}
  @Input()
  set hero (hero: Hero) {  // set属性
    this.restoreService.setItem(hero);
  }
  get hero () {  // get属性
    return this.restoreService.getItem();
  }
  onSaved () {
    this.saved.next(this.restoreService.getItem());
  }
  onCanceled () {
    this.hero = this.restoreService.restoreItem();
    this.canceled.next(this.hero);
  }
}

/**
 * ## 父组件监听子组件的事件
 * 子组件暴露一个 EventEmitter 属性，当事件发生时，子组件利用该属性 emits( 向上弹射 ) 事件(或称为子组件调用父组件早先注册的事件处理函数)。父组件绑定到这个事件属性，并在事件发生时作出回应。
 * 子组件的 EventEmitter 属性是一个 输出属性 ，通常带有 @Output 装饰器 .
 */