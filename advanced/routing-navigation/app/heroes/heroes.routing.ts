import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroListComponent }    from './hero-list.component';
import { HeroDetailComponent }  from './hero-detail.component';

const heroesRoutes: Routes = [
  { path: 'heroes',  component: HeroListComponent },
  { path: 'hero/:id', component: HeroDetailComponent }
];

/**
 * 在设置 app.routing.ts 时，我们使用了静态的 forRoot 方法来注册我们的路由和全应用级服务提供商。 
 * 在特性模块中，我们要改用 Router.forChild 静态方法。
 */
export const heroesRouting: ModuleWithProviders = RouterModule.forChild(heroesRoutes);

/**
 * # 路由参数：必选还是可选？ (ROUTE PARAMETER: REQUIRED OR OPTIONAL?)
 * 在这个场景下，把路由参数的令牌 :id 嵌入到路由定义的 path 中是一个好主意，因为对于 HeroDetailComponent 来说 id 是 必须的，
 * 而且路径中的值 15 已经足够把到“ Magneta ”的路由和到其它英雄的路由明确区分开。
 * 当我们把一个 可选 值传给 HeroDetailComponent 时， 可选路由参数 可能是一个更好的选择。
 */

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/