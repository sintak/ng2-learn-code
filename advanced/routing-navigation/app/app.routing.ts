import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { loginRoutes,
         authProviders }      from './login.routing';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard }          from './auth-guard.service';

/**
 * 习惯上，延迟加载模块的和不延迟加载模块的分别封装管理。不延迟加载的也使用自己的routing文件
 */
const adminRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',  // 用 loadChildren 属性来映射我们希望延迟加载的捆文件，这里是 AdminModule 。
    canLoad: [AuthGuard]  // CanLoad 守卫 : 保护特性模块的加载. 把 AuthGuard 导入到 app.routing.ts 中，并把 AuthGuard 添加到 admin 路由的 canLoad 数组中。现在 admin 特性区就只有当获得访问授权时才会被加载了。
    // Angular 提供一个内置模块加载器，支持 SystemJS 来异步加载模块。如果我们使用其它捆绑工具比如 Webpack ，则使用 Webpack 的机制来异步加载模块。
  }
];

/**
 * 最后把延迟加载的和不延迟加载的合并到一个数组以便进行RouterModule.forRoot
 */
const appRoutes: Routes = [
  ...loginRoutes,  // spread(...)操作符表示展开数组 （不延迟加载的）
  ...adminRoutes  // (延迟加载的)
];

/**
 * ## 统一管理可注入的路由相关的类
 * 导出了一个 appRoutingProviders 数组，以便将来可以在 app.module.ts 中注册路由器的依赖(例如路由守卫)。 
 */
export const appRoutingProviders: any[] = [  // for AppModule>>providers
  // # Router 可以在导航过程中注入这里配置的路由守卫
  authProviders,
  CanDeactivateGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

/**
 * 
  const appRoutes: Routes = [
    { path: 'hero/:id', component: HeroDetailComponent },
    { path: 'crisis-center', component: CrisisCenterComponent },
    {
      path: 'heroes',
      component: HeroListComponent,
      data: {
        title: 'Heroes List'
      }
    },
    { path: '', component: HomeComponent },
    { path: '**', component: PageNotFoundComponent }
  ];
 *
 * # 路由配置说明
 * + 第一个路由中的 :id 是一个路由参数的令牌 (Token) 。比如 /hero/42 这个 URL 中，“ 42 ”就是 id 参数的值。 此 URL 对应的 
 *   HeroDetailComponent 组件将据此查找和展现 id 为 42 的英雄。 在本章中稍后的部分，我们将会学习关于路由参数的更多知识。
 * + 第三个路由中的 data 属性用来存放于每个具体路由有关的任意信息。该数据可以被任何一个激活路由访问，
 *   并能用来保存诸如 页标题、面包屑以及其它只读数据。本章稍后的部分，我们将使用 resolve 守卫 来获取这些附加数据。
 * 
 * ## 注意：
 * ```
 * 这些路由的定义顺序 是故意如此设计的。路由器使用 先匹配者优先 的策略来匹配路由，所以，具体路由应该放在通用路由的前面。
 * 在上面的配置中，带静态路径的路由被放在了前面，后面是空路径路由，因此它会作为默认路由。而通配符路由被放在最后面，
 * 这是因为它是最通用的路由，应该 只在 前面找不到其它能匹配的路由时才匹配它。
 * ```
 */

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/