import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { Admin1Component }           from './admin1.component';
import { Admin1DashboardComponent }  from './admin1-dashboard.component';
import { Manage1CrisesComponent }    from './manage1-crises.component';
import { Manage1HeroesComponent }    from './manage1-heroes.component';

import { AuthGuard1 }                from '../auth-guard1.service';

const adminRoutes: Routes = [
  {
    path: '',//'admin-1',
    component: Admin1Component,
    canActivate: [AuthGuard1],  // 守卫组件
    children: [
      {
        // 有一个带 path 和 children 的子路由，但它没有使用 component 。这并不是配置中的失误，而是在使用 无组件 路由。
        path: '',
        canActivateChild: [AuthGuard1],  // 守卫子组件
        children: [
          { path: 'crises', component: Manage1CrisesComponent },
          { path: 'heroes', component: Manage1HeroesComponent },
          { path: '', component: Admin1DashboardComponent }
        ]
      }
    ]
  }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);

/**
 * # 子路由与无组件路由的关系
 * 
 */
