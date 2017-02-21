import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  // 指令也包含在里面

import { FormsModule } from '@angular/forms';

// # APP ROOT
import { AppComponent }  from './app.component';
// 已移到CoreModule中 // import { TitleComponent } from './title.component';  // 独立的title组件
// 已移到SharedModule中 // import { HighlightDirective } from './highlight.directive';  // 指令
// 已移到CoreModule中 // import { UserService } from './user.service';

// # component
// 已封装到独立模块ContactModule中 // import { ContactComponent } from './contact/contact.component';

// # directive
// 已封装到独立模块ContactModule中 // import { HighlightDirective as ContactHighlightDirective } from './contact/highlight.directive';  // as 解决指令冲突

// # pipe
// 已封装到独立模块ContactModule中 // import { AwesomePipe } from './contact/awesome.pipe';

// # service
// 已封装到独立模块ContactModule中 // import { ContactService } from './contact/contact.service';

// # feature module
import { ContactModule } from './contact/contact.module';
import { CoreModule } from './core/core.module';  // 封装上面的component/directive/pipe/service成独立的模块

// # routing
import { routing } from './app.routing';  // 通过路由导航后，不再需要在根模块里元数据imports模块了

@NgModule({
  imports: [ 
    BrowserModule,
    // FormsModule, 给contact用的，contact已抽取为模块后
    ContactModule,
    // CoreModule,
    CoreModule.forRoot({ userName: 'Runddlhause Kode'}),  // 使用函数返回值来提供，好处是可以自定义配置
    routing,

    ],  // 模块数组。类型为 BrowserModule | ModuleWithProviders
  declarations: [  // 声明从属该模块的组件/指令/管道 数组. 注意：组件、指令和管道 只能 属于一个模块。
    AppComponent,
    // 已封装到模块 // HighlightDirective, // 高亮指令
    // 已封装到模块 // TitleComponent,

    // AwesomePipe,  // 管道
    // ContactComponent,  // contact组件
    // ContactHighlightDirective,  // 另一个高亮指令
    ],
  bootstrap:    [ AppComponent ],  // 启动组件数组
  providers: [ /*(已封装到module(CoreModule),导入module即可) UserService, *//*(已封装到ContactModule) ContactService*/ ],  // 服务数组。UserService 是全应用级单例。加入 AppModule 元数据的 providers 属性中，来把它 提供 给所有组件使用。
})
export class AppModule { }


/**
 * 注意：
 * 这里只加载了ContactModule和CoreModule，还有CrisisModule和HeroModule是通过路由来延迟加载
 * 
 * # 为什么要declarations声明从属该模块的组件/指令/管道？
 */