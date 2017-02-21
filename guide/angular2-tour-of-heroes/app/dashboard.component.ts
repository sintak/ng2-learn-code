import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import { WOWHero } from './WOWHero';
import { WOWHeroService } from './WOWHero.Service';

@Component({
    selector: 'my-dashboard',
    //template: '<h3>My Dashboard</h3>'
    templateUrl: 'app/dashboard.component.html',
    styleUrls: ['app/dashboard.component.css']
    , providers: [WOWHeroService]
})
export class DashboardComponent implements OnInit {

    wowHeroes: WOWHero[] = [];

    constructor(private wowHeroService: WOWHeroService, private router: Router) {
        console.log("DashboardComponent constructor wowHeroService.serviceID: " + wowHeroService.serviceID);
    }

    ngOnInit(): void {
        this.wowHeroService.getWOWHeros()
            .then(wowHeroes => this.wowHeroes = wowHeroes.slice(1, 5));
    }

    gotoDetail(wowHero: WOWHero): void {
        // not implemented yet
        let link = ['/detail', wowHero.id];  // 生成路由的 链接参数数组.  let: 后面有花括号的话，就生成块级域的值（即每次进入花括号就生成一个值）
        this.router.navigate(link);  // 把这个数组传给路由器的 navigate 方法。

        // ----------------------
        // 测试语法：
        let expectedHeroes = [{ name: 'A' }, { name: 'B' }]
        let h = [new WOWHero()];
        let hh = Promise.resolve(h);
        let mockService = <WOWHeroService>{ getWOWHeros1: () => expectedHeroes }  // 创建一个WOWHeroService对象，覆写其getWOWHeros1方法
        let mockService1 = <WOWHeroService>{ getWOWHeros1: () => h }
        let mockService2 = <WOWHeroService>{ getWOWHeros: () => hh }

        it('should have heroes when HeroListComponent created', () => {
            //   let hlc = new HeroListComponent(mockService);
            //expect(hlc.heroes.length).toEqual(expectedHeroes.length);
        });

        // ----------------------

    }


}
