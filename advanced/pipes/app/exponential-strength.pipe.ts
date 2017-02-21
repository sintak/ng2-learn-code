import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'exponentialStrength'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent: string): number {
    let exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp);
  }
}

/**
 * # 自定义管道
 * 实现PipeTransform接口
 * 在 AppModule 的 declarations 数组中包含这个管道。
 * (我们使用自定义管道的方式和内置管道完全相同。)
 * 
 * # 关于接口
 * 编译后不存在接口信息，这里的接口仅仅作为约束给开发人员看的
 * 
 */

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/