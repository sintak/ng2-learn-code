import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisListComponent }       from './crisis-list.component';
import { CrisisCenterComponent }     from './crisis-center.component';
import { CrisisDetailComponent }     from './crisis-detail.component';

import { CanDeactivateGuard }    from '../can-deactivate-guard.service';

import { CrisisDetailResolve }   from './crisis-detail-resolve.service';

const crisisCenterRoutes: Routes = [
  {
    path: '',
    redirectTo: '/crisis-center',
    pathMatch: 'full'  // “重定向（ redirect ）路由”需要一个 pathMatch 属性来告诉路由器如何把 URL 和路由中的路径进行匹配。
    // 关于重定向： http://victorsavkin.com/post/146722301646/angular-router-empty-paths-componentless-routes
  },
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    children: [  // 子路由。何时使用子路由：特性区有自己的<router-outlet>嵌入子组件的时候，特性区的路由很少交叉（就是多处会导航到这里）。子路由使用场景比如：
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],  // 用 CanDeactivate 阻止离开当前路由的导航. 路由器调用此守卫
            resolve: {  // 提供一个resolve给路由，它实现这些: 让程序先解析必要的危机，再加载路由。或者当用户导航到一个无效的危机 :id 时，将它们导航回危机列表。
              crisis: CrisisDetailResolve  // ?
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];

export const crisisCenterRouting: ModuleWithProviders = RouterModule.forChild(crisisCenterRoutes);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/