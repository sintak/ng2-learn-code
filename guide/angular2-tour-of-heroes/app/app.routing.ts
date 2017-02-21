import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WOWHeroesComponent }      from './WOWHeroes.component';
import { DashboardComponent }      from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component'

const appRoutes: Routes = [
  {
    path: 'wowheroes',
    component: WOWHeroesComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'detail/:id',  // 路径中的冒号 (:) 表示 :id 是一个占位符，当导航到这个 HeroDetailComponent 组件时，它将被填入一个特定英雄的 id 。
    component: HeroDetailComponent//WOWHeroesComponent
  }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
