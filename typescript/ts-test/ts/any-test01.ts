
export interface Date {
    whatthe(): number
}

// import 'any-test';

// let a = SF1Test({} as any);
// test(a);


function test(arg) {

}


class AA {
    a: string;
    b: number;
}

function test1(arg: AA) {

}

test1({ a: '', b: 3 });



export * from './any-test01';

//

console.log('typescript需要apply call bind')
// typescript是否需要apply call bind?  答案： 是需要的 (C#不需要)
namespace ApplyCallBind {
    class A {
        name: string = 'Mr.A';
        refresh() {
            console.log(this.name + '\'s refresh');
        }
    }

    class B {
        constructor(refresher: Function) {
            this.invoker = refresher;
        }
        name: string = 'Mr.B';
        invoker: Function;
    }

    let a = new A();
    let b = new B(a.refresh.bind(a));  // 答案： 是需要的 (C#不需要)
    // a.refresh.apply(b);
    b.invoker();
}

// 对象、数组、map遍历对比，分别为371.651ms 7.062ms 110.582ms
let count = 1000000;
let oV = {};
let aV = [];

for (let i = 0; i < count; i++) {
    oV[i] = i;
}
// console.log(oV);
for (let i = 0; i < count; i++) {
    aV.push(i);
}
// console.log(aV);

console.time('test1');
for (var v in oV) {   // for in 会有取key的步骤
}
console.timeEnd('test1');


console.time('test2');

for (let v of aV) {
}
console.timeEnd('test2');


let m = new Map();

for (let i = 0; i < count; i++) {
    m.set(i, i);
}
console.time('test3');
m.forEach((v, i) => { })
console.timeEnd('test3');

// output:
// 303
// 6
// 78

let sym1 = Symbol();

let sym2 = Symbol("key"); // 可选的字符串key
// Symbols是不可改变且唯一的。

let sym3 = Symbol("key");

console.log(sym2 === sym3); // false, symbols是唯一的

let map = new Map<number, string>();
map.set(1, 'aaa');
map.set(2, 'bbb');
map.set(1, 'ddd');
map.forEach(e => console.log(e));
let ar = new Array(map.values());
console.log(ar);
let arr = new Array();
map.forEach(e => arr.push(e));
console.log(arr);

interface IABC {
    a: string;

}

class A {
    submit(): { a: number } {
        console.log('i am A')
        // return {a: 3, b: 4}; 错误
        return { a: 3 };
    }

    test(): IABC {
        // return {a: '3', b: '3'} 错误
        return { a: '3' }
    }

}

class AAA extends A {
    submit() {
        console.log('i am AAA')
        return { a: 3 };

    }
}


// }
Date.prototype.whatthe = function () { return 1 }

export interface AAFDS {

}

declare global {

    interface Date {
        whatthe(): number
    }
}

// ------------------------------
// JS的继承
// let PageAbs = function (name) {
//     this.getHtml = function () {
//         console.log(name);
//     }
// };



// let apply = function () {
//     PageAbs.call(this, 'Sintak');
//     let pageHtml = this.getHtml();
// }

// apply();

// ------------------------------
// 参数约定
class ABC {
    test(o: { a: number, b: string }): { a: string, b: number } {
        // return {a: '', b: 3, c: 3}  报错
        // return {a: '', b: 3}  // 完全匹配
        let t = { a: '', b: 3, c: 4 };  // 不会报错
        return t;
    }

    constructor() {
        let o = { a: 3, b: '', c: 3 }
        // this.test({a: 3, b: '', c: 3}) 报错
        this.test(o)  // 不会报错
    }

}

// -----------------------------------------------
// class AABB {
//     a: string;
//     c: number;
// }

// class AABBCC {
//     test<T extends AABB>(t: T): T {
//         return { a: 'hello', c: 3};
//     }
// }
// -----------------------------------------------
class AABBCCDD {
    a: string;
    c: number;
}
let aabbrr = AABBCCDD as Readonly<typeof AABBCCDD>;
aabbrr.prototype.a = 'fdas';

let aabbr = new AABBCCDD() as Readonly<AABBCCDD>;
// aabbr.a = 3;  只读


// ------------------------------
// ...语法
class ABCABC {
    test(...args: any[]) {
        args.forEach(arg => console.log(arg));
    }
}

new ABCABC().test(1, 2, 'hello', 3)
// -------
let abc = {a: 'sfd', b: 3};
console.log(abc);
delete abc['b'];
console.log(abc);
