import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { WOWHero } from './WOWHero';
import { WOWHeroService } from './WOWHero.Service';
import { ActivatedRoute, Params } from '@angular/router';

// 使用 @Component 装饰器创建[元数据]
@Component({
    selector: 'my-hero-detail',  // 指定选择器
    //template: ``,  // 指定了此组件的模板. 它用一种增强的 HTML 形式写成，用来告诉 Angular 如何渲染此组件的视图。
    templateUrl: 'app/hero-detail.component.html',
    styleUrls: ['app/hero-detail.component.css']
    , providers: [WOWHeroService]
})
export class HeroDetailComponent implements OnInit {
    // 输入 属性通常接收数据值。 输出 属性暴露事件生产者，比如 EventEmitter 对象。 输入 和 输出 这两个词是从目标指令的视角来说的。
    @Input()  wowHero: WOWHero;  // @Input(别名): 声明成 输入属性. 输入到HTML中
    // @Output('myClick') clicks = new EventEmitter<string>(); //  @Output(alias) propertyName = ..
    @Output() close = new EventEmitter();  // 用 @Output() 来装饰它，或者把它添加到组件元数据的 outputs 数组中，它才能在父级组件可见(组件与父级组件交互的主要方式之一)
    error: any;
    navigated = false;  // true if navigated here

    constructor(private wowHeroService: WOWHeroService, private router: ActivatedRoute) {
        console.log("HeroDetailComponent constructor wowHeroService.serviceID: " + this.wowHeroService.serviceID);
    }

    ngOnInit(): void {
        this.router.params.forEach((params: Params) => {
            // let id = +params['id'];
            // this.wowHeroService.getWOWHeroById(id)
            //     .then(hero => this.wowhero = hero);
            if(params['id'] !== undefined) {
                let id = +params['id'];
                this.navigated = true;
                this.wowHeroService.getWOWHeroById(id)
                    .then(hero => this.wowHero = hero);
            } else {
                this.navigated = false;
                this.wowHero = new WOWHero();
            }
        });
    }



    save(): void {
        this.wowHeroService
            .save(this.wowHero)
            .then(hero => {
                this.wowHero = hero; // saved hero, w/ id if new
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }
    goBack(savedHero: WOWHero = null): void {
        this.close.emit(savedHero);  // emit通知
        if (this.navigated) {
            window.history.back();  // 实际项目中，注意CanDeactivate guard
        }

    }
}
