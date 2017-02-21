
/**
 * ## 实现TypeScript混合接口的方法
 * 两种写法都通过，不过方式2有个问题是改了接口了。还是方式1最好,方式4的对象合并方式也不错
 */
/**
 * 方式1: 利用索引器语法给对象设置附加属性
 * 推荐写法
 */

class WebDeptListInVo { b: string;}
class WebDeptListOutVo { a: string;}

export interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
  // test(v: WebDeptListInVo): Promise<WebDeptListOutVo>;
}

abstract class DF {
  reset1(): void{}
}

var c: Counter;
let func = (start: number) => { return 'Kode ' + start };
func['reset'] = () => { console.log('reset() 1'); };  // 索引器语法给对象设置附加属性
func['interval'] = 1111.0;
// c = func as Counter;  // 强转 ok
c = <Counter>func;  // 强转 ok
// c.interval = 5.0;

console.log(c(1));
c.reset();
console.log(c.interval);

console.info('--------');
// 官方写法. 通过一个方法去构造，核心要点还是强转绕开编译器检查（注意lambda表达式写法无法正确绕开编译器检查）
namespace Space101 {

  function getCounter(): any {
    // 不能用箭头写法，要用function才能确定初始类型
    /** ok */let counter = <Counter>function(start: number) { console.log(start) };
    counter.interval = 123;
    counter.reset = function () { console.log('reset() 101') };
    /** counter1.interval编译不过 */let counter1 = <Counter>(start: number) => { console.log(start) };
    /** counter2.interval编译不过 */let counter2 = <Counter>((start: number) => { console.log(start) });
    /** ok */let counter3 = ((start: number) => { console.log(start) }) as Counter;
    counter3.interval = 123;
    counter3.reset = function () { console.log('reset() 101') };
    
    return counter;
  }

  let cc = getCounter();
  cc(101);
  cc.reset();
  cc.interval = 5.0;
  console.log(cc.interval);

}

console.info('--------');
/**
 * 方式2： 利用自执行函数返回一个函数对象，利用了和JQuery一样的原理
 * 该方式需改原接口，不推荐
 */
interface xx {
  (id: string): string
  interval?: number;
  reset?(): void;
}

let XX: xx = (function () {
  var that: xx = function (id: string): string {
    return id + '2';
  };
  that.interval = 2222;
  that.reset = () => { console.log('reset() ' + '2'); };
  return that;
} ());

console.log(XX('Kode '));
XX.reset();
console.log(XX.interval);

console.info('--------')
/**
 * 方式3： 需要new的写法
 */
interface IXX {
  (id: string): string;
  new (par: string): IXX;  // 加个new()构造函数
  interval: number;
  reset(): void;
}
declare const XX1: IXX;  // 只是个声明，方便别人在TS代码中使用，编译后就不存在了。类似C语言的头文件
var XX3: IXX;  // 编译后还在
(<any>global).XX1 = function (par: string) {  // 如果不是使用node环境，需要改global为window，然后把编译后的js放到浏览器中执行
  var that: xx = function (id: string): string {
    return id + ' 3 ' + par;
  };
  that.interval = 3333;
  that.reset = () => { console.log('reset() ' + '3'); };
  return that;
}
let oo = new XX1('PARAMETER');
console.log(oo('Kode '));
oo.reset();
console.log(oo.interval);


console.log('--------')
/**
 * 方式4：用对象并集的方式合并混合类型（函数类型和对象类型）
 */
function merge1<T1, T2>(obj1: T1, obj2: T2): T1 & T2 {  // 返回一个并集
  // Object.keys(obj2).forEach(key => {
  //   obj1[key] = obj2[key];
  // });  // ok
  Object.assign(obj1, obj2);  // ok. 和Object.keys(o).forEach(k=>{})然后通过索引器设置附加属性的效果一样
  return obj1 as T1 & T2;
};

var c2: Counter = merge1(
  (start: number) => {  // 函数类型
    return '4';
  },
  {  // 对象类型
    interval: 444,
    reset: () => { console.log('reset() 4'); }
  }
);

console.log('Kode' + c2(444));
console.log(c2.interval);
c2.reset();

console.log('--------');
/**
 * 方式5：
 * 编译未通过
 */
// namespace Space5 {
//   function class_(name: string) {
//     return {
//       constructor_: function(fn: Function) {
//         (<any>global)[name]=fn;
//       }
//     }
//   }

//   interface ClassXX {
//     new (p1: string): IXX;
//   }
//   interface IXX {
//     (id: string): string;
//     interval: number;
//     reset(): void;
//   }
//   declare var XX:ClassXX;
//   class_("XX").constructor_(
//     function(p1: string) {
//       var that = function(id: string): string {
//         return p1;
//       }
//       var xx: IXX = that as IXX;
//       xx.interval = 555;
//       xx.reset = (): string => { return 'reset() 5'};
//       return xx;
//     }
//   );
//   let oo = new XX('Kode');
//   oo.interval = parseInt(oo('5'));
//   console.log(oo.reset());

//   // ((test:IXX) => {})(oo);
// }


console.log('--------');
/**
 * 方式6：
 * 编译未过，和方式5编译错误一样
 */
// namespace Space6 {
//   function __merge(target, source): any {
//     return function () {
//       var ret = target.apply(this.arguments);
//       Object.keys(source.call(ret)).forEach((key, v) => {
//         source[key] = v;
//       });
//     }
//   }

//   export function CPN<T, U>(fn: (...arg) => T, intface: U, merge: (this: T & U) => U): new (...arg) => T & U {
//     return __merge(fn, merge);
//   }

//   interface IXX {
//     interval: number;
//     reset(interval: number): void;
//   }

//   var XX = CPN(
//     (p1: string) => function (id: string): string {
//       return p1;
//     },
//     <IXX>null,
//     function (this) {
//       return {
//         interval: 666 as number,
//         reset: (interval: number) => {
//           this.reset(this.interval);
//         }
//       }
//     }
//   );

//   let xx = new XX('xx');
//   xx.interval = parseInt(xx('id'));
//   xx.reset(xx.interval);

// }