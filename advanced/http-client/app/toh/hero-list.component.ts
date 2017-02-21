import {Component, OnInit } from '@angular/core';

import { Hero }           from './hero';

import { HeroService } from './hero.service';
// import { HeroService } from './hero.service.promise';

@Component({
    moduleId: module.id,
    selector: 'hero-list',
    templateUrl: 'hero-list.component.html',
    providers: [HeroService]  // 组件级注入
})
export class HeroListComponent implements OnInit {
    errorMessage: string;
    heroes: Hero[];
    mode = 'Observable';

    constructor(private heroService: HeroService) { }

    ngOnInit() { this.getHeroes(); }

    // # Observable 与 Promise 形式实现
    getHeroes() {  // use Observable
        // http.get 仍然没有发送请求！ 这是因为可观察对象是 冷淡的 ，也就是说，
        // 只有当某人 订阅 了这个可观察对象时，这个请求才会被发出。 这个场景中的 某人 就是 HeroListComponent 。
        this.heroService.getHeroes()
            .subscribe(  // 可观察对象，使用订阅可以持续不断的获取新的值。
            heroes => this.heroes = heroes,
            error => this.errorMessage = <any>error);
    }
    // getHeroes() {
    //     this.heroService.getHeroes()
    //         .then(
    //         heroes => this.heroes = heroes,
    //         error => this.errorMessage = <any>error);
    // }
    addHero(name: string) {  // use Observable
        if (!name) { return; }
        this.heroService.addHero(name)
            .subscribe(
            hero => this.heroes.push(hero),
            error => this.errorMessage = <any>error);
    }
    // addHero(name: string) {
    //     if (!name) { return; }
    //     this.heroService.addHero(name)
    //         .then(
    //         hero => this.heroes.push(hero),
    //         error => this.errorMessage = <any>error);
    // }
}

/**
 * # 关于subscribe()
 * Subscription 不是另一个 Observable 。 它是可观察对象的末端。
 * 我们不能在它上面调用 map 函数或再次调用 subscribe 函数。 
 * Subscription 对象的设计目的是不同的，这从它的主方法 unsubscribe 就能看出来。
 */