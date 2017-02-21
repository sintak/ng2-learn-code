// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';  // 引入所需的文件
import { Router } from '@angular/router';

import { WOWHero } from './WOWHero';
import { WOWHeroService } from './WOWHero.Service';


/**
 * Component 是一个 装饰器函数 ，它接受一个 元数据对象 作为参数。 通过给这个函数加上 @ 前缀，并使用 metadata 对象调用它，可以把这个“函数调用”加到组件类的紧上方。
 * @Component 是一个 装饰器 ，它把 元数据 关联到组件类上。这些元数据会告诉 Angular 如何创建和使用组件类。
 */
@Component({
    selector: 'my-heroes',//'my-app',  // 指定了一个简单的 CSS 选择器，用于指出放置此组件的 HTML 元素。
    //template: ``,  // 指定了此组件的模板. 它用一种增强的 HTML 形式写成，用来告诉 Angular 如何渲染此组件的视图。管道操作符 ( | )
    templateUrl: 'app/WOWHeroes.component.html',
    // styles: [``],
    styleUrls: ['app/WOWHeroes.component.css']
    // 希望WOWHeroService只有一个实例的时候，应该移到app.module.ts的providers中
    , providers: [WOWHeroService]  // providers 数组告诉 Angular ，当它创建新的 WOWHeroesComponent 组件时，也要创建一个 WOWHeroService 的新实例。

})
export class WOWHeroesComponent implements OnInit {  // 一个叫AppComponent的根组件.通过它的模板控制一个视图的外观和行为。
    // 打算构建一个真实的应用时，通过添加属性和应用逻辑来扩展这个类

    // 这里的“双大括号”会告诉应用：从组件中读取 title 和 wowhero 属性，并且渲染它们。这就是单向数据绑定的“插值表达式”形式。
    // wowhero = 'Kode';

    // wowhero: WOWHero = {
    //     id: 2,
    //     name: "Sintak"
    // };

    wowHeroes: WOWHero[];

    selectedHero: WOWHero;

    addingHero = false;
    error: any;

    // 该构造函数类型、 @Component 装饰器、父级的 providers 信息这三个合起来，一起告诉 Angular 的注入器，在任何时候新建一个新的 WOWHeroesComponent 的时候，注入一个 WOWHeroService 的实例。
    constructor(private wowHeroService: WOWHeroService, private router: Router) {  // 构造函数参数的private/public修饰符指定为类内/公有?属性，不带修饰符时是普通函数参数
        console.log("WOWHeroesComponent constructor wowHeroService.serviceID: " + wowHeroService.serviceID);    
    }

    onSelect1(hero: WOWHero): void {
        this.selectedHero = hero;
        this.addingHero = false;
    }

    private getHeroes(): void {
        // this.wowheros = this.wowHeroService.getWOWHeros();
        this.wowHeroService
            .getWOWHeros()
            .then(wowheroes => this.wowHeroes = wowheroes)
            .catch(error => this.error = error);  // then
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    gotoDetail(): void {
        // let link = ['/detail', this.selectedHero.id];
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

    addHero(): void {
        this.addingHero = true;
        this.selectedHero = null;
    }

    close(savedHero: WOWHero): void {
        console.log('<my-hero-detail>close 事件触发');  // 去掉DOM元素时触发该DOM元素的close事件
        this.addingHero = false;
        if (savedHero) { this.getHeroes(); }
    }

    deleteHero(hero: WOWHero, event: any): void {
        event.stopPropagation();
        this.wowHeroService
            .delete(hero)
            .then(res => {
                this.wowHeroes = this.wowHeroes.filter(h => h !== hero);  // 过滤掉删除的hero更新列表
                if (this.selectedHero === hero) { this.selectedHero = null; }  // 是选中的话也清除
            })
            .catch(error => this.error = error);
    }



}  // export 导出 AppComponent ，以便在应用的其它地方 导入 它——比如创建 main.ts 时。
