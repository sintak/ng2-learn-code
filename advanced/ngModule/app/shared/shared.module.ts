import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { AwesomePipe }         from './awesome.pipe';
import { HighlightDirective }  from './highlight.directive';
import { TestService } from './test.service';

@NgModule({
  imports:      [ CommonModule ],  // 本模块用到的别的模块
  declarations: [ AwesomePipe, HighlightDirective ],
  exports:      [ 
    AwesomePipe, HighlightDirective,
    CommonModule, FormsModule
    ],  // 封装一组可供其它模块使用的模块/指令/管道/组件
  providers: [ TestService ]
})
export class SharedModule { }

/**
 * 从设计角度，SharedModule中的组件/指令/管道/服务每次使用都会被创建一个新的实例，各实例互不影响
 * 
 * SharedModule不作为单例，每次使用的时候都会创建module的从属组件/指令/管道/模块
 * 注意：全局唯一的服务单例不要注册到共享模块中(providers)，因为这会导致每次使用共享模块都会创建一个服务
 */