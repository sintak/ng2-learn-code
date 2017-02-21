import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'contact', pathMatch: 'full'},
  { path: 'crisis', loadChildren: 'app/crisis/crisis.module#CrisisModule' },  // loadChildren: 延迟加载。 模块 文件 和模块 类 ，两者用 # 分隔开。
  { path: 'heroes', loadChildren: 'app/hero/hero.module#HeroModule' }  
  // 延迟加载，直接通过loadChildren: 'app/hero/hero.module#HeroModule'的形式
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);


/**
 * 注意：不要在特性模块中调用RouterModule.forRoot
 */