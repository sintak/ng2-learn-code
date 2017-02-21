import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  // 几乎每个应用的 根模块 都要导入 BrowserModule 模块。
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { WOWHeroesComponent } from './WOWHeroes.component';  // 提为模块
import { WOWHeroService } from './WOWHero.service';  // 提为模块
import { DashboardComponent } from './dashboard.component'
import { routing } from './app.routing';  // A1.导入
import { HeroSearchComponent } from './WOWHero-search.component';

// import { CookieService } from 'angular2-cookie/services/cookies.service';

/**
 * imports:
 * 用来导出当前模块所需的“素材”
 * Angular 本身被拆分成了一组独立的模块，所以我们只要导入我们真正用到的那些就可以了。
 */

@NgModule({  // NgModule 装饰器
  imports:      [  // 添加到了 imports 数组中。 该模块包含了要在浏览器中运行我们的应用时所需的一切。 
      BrowserModule,
      FormsModule,
      HttpModule,
      InMemoryWebApiModule.forRoot(InMemoryDataService),
      routing  // A2.加进去
      // CookieService

      ],
  declarations: [ 
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    WOWHeroesComponent,
    HeroSearchComponent
    ],  // 宣告。从属于 当前 模块的组件、管道和指令。
  providers: [ WOWHeroService, ],  // 希望全局之中只有一个WOWHeroService实例的时候，将其包含在这里（@NgModule providers[]）
  bootstrap:    [ AppComponent ]  // 标记出 根组件 ，在启动应用时， Angular 应该通过它来进行 引导 。
})
export class AppModule { }  //Angular 应用通过 Angular 模块 组织成了一些功能紧密相关的代码块。 每个应用都至少需要一个模块（ 根模块 ），习惯上我们把它叫做 AppModule 。
