import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroList1Component } from './hero-list1.component';
import { HeroDetail1Component } from './hero-detail1.component';

/**
 * 在设置 app.routing.ts 时，我们使用了静态的 forRoot 方法来注册我们的路由和全应用级服务提供商。 
 * 在特性模块中，我们要改用 Router.forChild 静态方法。
 */
export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: HeroList1Component},  // 延迟加载似乎不能多个path做平级路由
  { path: ':id', component: HeroDetail1Component }  // <- 要导航到这里，navigate方法需要使用relativeTo  ##

  // ## 不使用延迟加载下的平级路由 ok
  // { path: 'heroes-1',  component: HeroList1Component },
  // { path: 'hero-1/:id', component: HeroDetail1Component }

  // {
  //   path: '',
  //   children: [
  //     { path: '', component: HeroList1Component},
  //     { path: 'hero-1/:id', component: HeroDetail1Component }
  //   ]
  // }
  
  // { path: '', redirectTo: 'list', pathMatch: 'full' },  
  // { path: 'list', component: HeroList1Component},
  // { path: ':id', component: HeroDetail1Component } 
]);


/**
 * ## 使用组件有3种方式：
 * 方式1(延迟加载).封装成特性区，然后就在routing中通过loadChildre延迟加载
 * 方式2.可以封装成模块，但不延迟加载，而是直接在AppModule元数据imports特性区注册即可
 * 方式3.不封装成模块，直接在app.routing.ts中管理该组件的Routes，并在AppModule元数据declarations该组件
 * 各种方式下path写法：
 * 方式1的： path:''
 * 方式2的： path:'contact'
 * 方式3的： path:'login'
 * （优先使用方式2和1。方式2是在程序启动时就加载，适合程序一启动就加载的组件）
 */

/**
 * ## 架构步骤
 * *.module.ts -> *.routing.ts -> *.service.ts -> *.component.ts -> pipe 
 */