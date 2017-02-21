// Promise Version
import {Component, OnInit } from '@angular/core';

import { Hero }           from './hero';

// import { HeroService } from './hero.service';
import { HeroService } from './hero.service.promise';

@Component({
    moduleId: module.id,
    selector: 'hero-list-promise',
    templateUrl: 'hero-list.component.html',
    providers: [HeroService]
})
export class HeroListPromiseComponent implements OnInit {
    errorMessage: string;
    heroes: Hero[];
    mode = 'Promise';

    constructor(private heroService: HeroService) { }

    ngOnInit() { this.getHeroes(); }

    // # Observable 与 Promise 形式实现
    // getHeroes() {
    //     this.heroService.getHeroes()
    //         .subscribe(  // 可观察对象，使用订阅可以持续不断的获取新的值。
    //         heroes => this.heroes = heroes,
    //         error => this.errorMessage = <any>error);
    // }
    getHeroes() {  // use Promise
        this.heroService.getHeroes()
            .then(
            heroes => this.heroes = heroes,
            error => this.errorMessage = <any>error);
    }
    // addHero(name: string) {
    //     if (!name) { return; }
    //     this.heroService.addHero(name)
    //         .subscribe(
    //         hero => this.heroes.push(hero),
    //         error => this.errorMessage = <any>error);
    // }
    addHero(name: string) {  // use Promise
        if (!name) { return; }
        this.heroService.addHero(name)
            .then(
            hero => this.heroes.push(hero),
            error => this.errorMessage = <any>error);
    }
}

/**
 * # 关于subscribe()
 * Subscription 不是另一个 Observable 。 它是可观察对象的末端。
 * 我们不能在它上面调用 map 函数或再次调用 subscribe 函数。 
 * Subscription 对象的设计目的是不同的，这从它的主方法 unsubscribe 就能看出来。
 */