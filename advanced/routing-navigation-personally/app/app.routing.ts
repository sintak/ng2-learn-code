import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard1 } from './auth-guard1.service';
import { Auth1Service } from './shared/auth1.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';

const adminRoutes: Routes = [
  {
    path: 'admin-1',
    loadChildren: 'app/admin1/admin1.module#Admin1Module',
    canLoad: [AuthGuard1]  // 使用AuthGuard1作为canLoad路由守卫。装载该模块的时候创建改实例，调用实例的canLoad方法
  }  
];


const appRoutes: Routes = [
    ...adminRoutes,
    { path: 'heroes-1', loadChildren: 'app/heroes1/heroes.module#Heroes1Module' },  // 使用延迟加载  子级特性区，导航path是子级形式##
];

/**
 * 导出了一个空的 appRoutingProviders 数组，以便将来可以在 app.module.ts 中注册路由器的依赖。 
 */
export const appRoutingProviders: any[] = [
  // # Router 可以在导航过程中注入这里配置的路由守卫. 
  // 路由守卫是一种@nIjectable对象，提供给app.module.ts的providers进行注入
  [AuthGuard1, Auth1Service],  // 数组或非数组均可，如果是数组，Angular内部会自动展开
  [CanDeactivateGuard]
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
