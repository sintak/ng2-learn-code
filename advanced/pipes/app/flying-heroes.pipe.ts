/* tslint:disable use-pipe-transform-interface */
import { Pipe, PipeTransform } from '@angular/core';

import { Flyer } from './heroes';

@Pipe({ name: 'flyingHeroes' })
export class FlyingHeroesPipe implements PipeTransform {
  transform(allHeroes: Flyer[]) {
    return allHeroes.filter(hero => hero.canFly);
  }
}

/////// Identical except for the pure flag
@Pipe({
  name: 'flyingHeroesImpure',
  pure: false
})
export class FlyingHeroesImpurePipe extends FlyingHeroesPipe {}

/**
 * # 纯 (pure) 管道与非纯 (impure) 管道
 * 纯管道指监测：值类型的值，引用指针值
 * 非纯管道监测：值类型的值，引用类型指向的值
 * 
 * 那么对于引用类型，更改重新赋引用值会让纯管道动作，更改引用指向的内容会让非纯管道动作
 * 注意：Angular 会在每个组件的变更检测周期中执行 非纯管道 。 
 *      非纯管道可能会被调用很多次，和每个按键或每次鼠标移动一样频繁。
 */

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/