import { Demo } from './models/demo'
import * as _ from 'lodash';

let demo = new Demo(3, 4);
console.log(demo.sum());
console.log(JSON.stringify(demo));


/**
 * 
 */
class Dog {
    name: string;
    age: number;
    height: number;
}

class Dog2 {
    name: string;
    age1: number;
}

class Program {
    static main(): void {
        let d1 = new Dog();
        d1.name = 'dog1';
        d1.age = 1;
        d1.height = 11;
        let d2 = new Dog2();
        d2.name = 'dog2';
        d2.age1 = 22;
        Object.assign(d1, d2);
        console.log(d1);
    }

    // getAsync(): Promise<any> {
    //     return Promise.resolve('hello');
    // }

    // async get123() {
    //     await this.getAsync();
    // }
}

Program.main();


interface IFace {
    test(): string;
}


class ABC implements IFace {
    test(): string {
        return 'hello world';
    }
}

let o: IFace = new ABC();
console.log(o.test());

enum Test {
    A,
    B,
    C
}

// 并集测试
console.log('并集测试:');

class C1 {
    a: string;
    b: string;
}

class C2 {
    a: string;
    c: string;
    d: string;
}


class CC {
    static test(cc: C1 & C2) {
        console.log(cc);
    }

    static test2(c1: C1, c2: C2): (C2 & C1)[] {
        return [Object.assign(c1, c2), Object.assign(c2, c1)];
    }

    static test3(c1: C1, c2: C2): (C2 & C1)[] {
        return [_.merge(c1, c2), _.merge(c2, c1),
        _.assign(c1, c2), _.assign(c2, c1),
        _.extend(c1, c2), _.extend(c2, c1)];
        // 三个函数结果一样。？
    }
}

CC.test({ a: 'aa', b: 'bb', c: 'cc', d: 'dd' });


let c1 = new C1();
let c11 = new C1();
c1.a = 'aa';
c1.b = 'bb';
let c2 = new C2();
c2.a = 'aaaaaaa';
// c2.c = 'cc';  // ### 没这个值，出来的对象没有该属性了（但js是不会报错的，只会显示undefined，这点和C#有点不同，JS对象内部很容易变化）
c2.d = 'dd';
console.log(CC.test2(c1, c2));  // 输出C1 { a: 'aaaaaaa', b: 'bb', d: 'dd' }
console.log(CC.test2(c1, c2)[0].c);  // 输出undefined
console.log(CC.test3(c1, c2));  // 

// 解构赋值

let { a, b } = c1;
let { a: aaaa, b: bbbb } = c1; // 取别名

console.log(a);


// 
console.log('------------------------------------------------------ 接口');
/**
 * TS的接口比C#的接口用法更多
 */
export interface SearchFunc {
    (source: string, subString: string): boolean;  // 约束方法签名
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    let result = source.search(subString);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}

export interface SearchFunc1 {
    title: string;
    method111: (source: string, subString: string) => boolean;  // 约束类方法签名
    sf1?: SearchFunc1;
}
export class SF implements SearchFunc1 {
    title = 'Title';
    sf1 = {} as SearchFunc1;
    method111(source: string, subString: string): boolean {
        return false;
    }
}

export function SF1Test(sf1: SearchFunc1): SearchFunc1 {
 return {} as SearchFunc1;
}

SF1Test({title:'', method111: () => {return false}});

let sf1: SearchFunc1 = {
    title: 'Title',
    sf1: {} as SearchFunc1,
    method111: () => {return false;}//, abc: 'aabbcc' // 不能有多余的成员，否则波浪线提示
}

SF1Test(sf1);

console.log('------------------------------------------------------ Map: ');

var m: Map<string, any> = new Map<string, any>();
let o1  = {p: "Hello world"};

m.set('Hello', o1);
console.log(m.get("Hello"));

console.log(m.has("Hello"));
console.log(m.delete("Hello"));
console.log(m.has("Hello"));



console.log('------------------------------------------------------ 实例方法与静态方法调用时间测试：')

class Class1 {
    static test() {let date = new Date();}
}

class Class2 {
    test() {let date = new Date();}
}

let c1startTime = new Date();
for(let i=0; i< 100000000; i++) {
    Class1.test();
}
console.log('Class1 static method time span: ' + (+new Date()-+c1startTime) );

let c2startTime = +new Date();
let class2 = new Class2();
for(let i=0; i< 100000000; i++) {
    class2.test();
}
console.log('Class2 instance method time span: ' +  (+new Date()-+c2startTime) );
// 结果：调用实例方法速度稍快
// Class1 static method time span: 17902
// Class2 instance method time span: 15056



console.log('------------------------------------------------------ sb-js');
import { List } from 'linqts';
// import { StringBuffer } from 'sb-js';
// // var StringBuffer = require("sb-js").StringBuffer1
// let sb = new StringBuffer('Hello');
// sb.add_line(' world');
// console.log(sb.toString());


console.log('------------------------------------------------------ 声明合并');

interface m1 {
    a: string;
}
interface m1 {
    b: number;
}

let me: m1;
me.a
me.b

// declare module window {
//     interface window {
//         abc: string;
//     }
// }

// interface window {
//    aaa: string;
//     bbb(): void;
// }
// interface Window {
//     aaa: string;
//     bbb(): string;
// }
// (<any>window).fd = '3';
// window.bbb

console.log('------------------------------------------------------ ')


export * from './any-test';
