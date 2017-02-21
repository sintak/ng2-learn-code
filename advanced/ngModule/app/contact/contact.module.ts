import { NgModule }           from '@angular/core';
// 已通过ShareModule导出 // import { CommonModule }       from '@angular/common';
// 已通过ShareModule导出 // import { FormsModule }        from '@angular/forms';
// 已封装到SharedModule模块 // import { AwesomePipe }        from './awesome.pipe';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent }   from './contact.component';
import { ContactService }     from './contact.service';
// 已封装到SharedModule模块 // import { HighlightDirective } from './highlight.directive';
import { routing } from './contact.routing';

@NgModule({
  imports: [ /* CommonModule, FormsModule, */SharedModule, routing],  // 特性模块中导入 CommonModule 可以让它能用在任何目标平台上，不仅是浏览器。
  declarations: [ContactComponent, /* HighlightDirective, AwesomePipe */],
  // 通过路由导航，不再需要导出ContactComponent，component中也不再需要selector // exports:      [ ContactComponent ],
  providers: [ContactService]
})
export class ContactModule {
  ID: string | number;

  constructor() {
    // # 打印看是否单例        
    if (this.ID) {
      console.log('Using ContactModule ID: ' + this.ID);
    }
    else {
      this.ID = new Date().getTime();
      console.log('Now created ContactModule ID: ' + this.ID);
    }
  }
}

/**
 * # 关于特性模块
 * 当前模块不会继承其它模块中对组件、指令或管道的访问权。 AppModule 中的 imports 与 ContatModule 的 imports 互不相干。 
 * 如果 ContactComponent 要绑定到 [(ngModel)] ，它所在的 ContactModule 必需导入 FormsModule 。
 */