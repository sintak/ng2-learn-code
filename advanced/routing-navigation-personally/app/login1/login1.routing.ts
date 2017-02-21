import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login1Component } from './login1.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', redirectTo: '/login-1', pathMatch: 'full'},
  { path: 'login-1', component: Login1Component}
  // { path: '', component: Login1Component}  // 错误。该组件不使用延迟加载，不能path:''这种写法
]);

/**
 * # 关于RouterModule.forRoot和RouterModule.forChild
 * 
 * 
 * 注意：总是在特性模块中调用 RouterModule.forChild 。
 */