import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Hero, HeroService1 } from './hero.service1';

@Component({
    moduleId: module.id,
    templateUrl: 'hero-list1.component.html'
})
export class HeroList1Component {
    heroes: Hero[];

    private selectedId: number;

    constructor(
        private service: HeroService1,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        // # 初始装载heroes
        this.route.params.forEach((params: Params) => {
            this.selectedId = +params['id'];
            this.service.getHeroes()
                .then(heroes => this.heroes = heroes);
        });
    }

    // # 样式类使用
    isSelected(hero: Hero) { return hero.id === this.selectedId; }

    // # 选择时导航到detail
    onSelect(hero: Hero) {
        // this.router.navigate(['/hero-1', hero.id]);  // not ok
        // this.router.navigate(['/list' , hero.id]);  // not ok
        // this.router.navigate(['/heroes-1/hero-1' , hero.id]);  // -> 对应path: 'hero-1/:id' （延迟加载特性区情况）

        // this.router.navigate(['hero-1', hero.id]);  // 平级路由使用绝对地址 ##

        // skipLocationChange不更改地址栏地址
        // 使用relativeTo -> 对应path: ':id'。 使用相对地址有个问题就是地址如果带参数就会一直带着这串参数 ##
        // replaceUrl: true ?
        this.router.navigate([hero.id], { relativeTo: this.route })
            .then(flag => console.log('导航结束，结果：' + flag));
        // this.router.navigate([this.router.url.substring(0, this.router.url.indexOf(';'))+'/' + hero.id])
        //     .then(flag => console.log('导航结束，结果：' + flag));  // not ok
        // location.pathname = this.router.url.substring(0, this.router.url.indexOf(';'));

        console.log(this.router.url);
    }
}
