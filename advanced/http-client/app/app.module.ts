import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { HeroListComponent } from './toh/hero-list.component';
import { HeroListPromiseComponent } from './toh/hero-list.component.promise';

import { WikiComponent } from './wiki/wiki.component';

import { InMemoryWebApiModule }     from 'angular2-in-memory-web-api';
import { HeroData }                 from './hero-data';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        InMemoryWebApiModule.forRoot(HeroData)  // forRoot 方法的名字告诉我们，应该只在设置根模块 AppModule 时调用 InMemoryWebApiModule 一次 。不要再次调用它。
        // 注意：一旦使用了 InMemoryWebApiModule.forRoot(T),应用就会重定向到使用InMemoryWebApi，不能再使用普通Json文件端点
    ],
    // 如果忘记把组件声明到declarations，浏览器调试就会出现Unhandled Promise rejection: Template parse errors: 'hero-list-promise' is not a known element
    declarations: [AppComponent, HeroListComponent, HeroListPromiseComponent, WikiComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }


/**
 * # 关于内存api重定向
 * 使用标准 Angular 提供商注册方法， InMemoryWebApiModule 替代默认的 XHRBackend 服务并使用它自己的内存存储服务。 
 * forRoot 方法来自模拟的英雄数据集的 种子数据 初始化了这个内存 Web API
 */