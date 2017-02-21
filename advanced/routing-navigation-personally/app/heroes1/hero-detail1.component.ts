import {
    Component, OnInit,
} from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Hero, HeroService1 } from './hero.service1';

@Component({
    moduleId: module.id,
    templateUrl: 'hero-detail1.component.html'
})
export class HeroDetail1Component implements OnInit {

    hero: Hero;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: HeroService1) {

    }
    ngOnInit(): void {
        // # 获取并展示hero
        this.route.params.forEach((params: Params) => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.service.getHero(id).then(hero => this.hero = hero);
        });
    }

    // # 回到列表
    gotoHeroes(): void {
        let heroId = this.hero ? this.hero.id : null;

        this.router.navigate(['/heroes-1', { id: heroId, WTF: 'What the f'}]);
    }
}