import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Login1Component } from './login1.component';
import { routing } from './login1.routing';

@NgModule({
  imports: [CommonModule, routing],
  declarations: [Login1Component],
  // 通过路由导航，不再需要导出ContactComponent，component中也不再需要selector // exports:      [ ContactComponent ],
  providers: []
})
export class Login1Module {
  ID: string | number;

  constructor() {
    // # 打印看是否单例        
    if (this.ID) {
      console.log('Using Login1Module ID: ' + this.ID);
    }
    else {
      this.ID = new Date().getTime();
      console.log('Now created Login1Module ID: ' + this.ID);
    }
  }
}

/**
 * # 关于特性模块
 * 当前模块不会继承其它模块中对组件、指令或管道的访问权。 AppModule 中的 imports 与 ContatModule 的 imports 互不相干。 
 * 如果 Login1Component 要绑定到 [(ngModel)] ，它所在的 Login1Module 必需导入 FormsModule 。
 */