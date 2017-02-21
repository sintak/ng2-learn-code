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

console.log('------------------------------------------------------ 装饰器');
/**
 * ### 装饰器
 * + 装饰器工厂
 * ```
 * 程序装载的时候装饰器就会被调用
 * ```
 */
function color(value: string) { // 这是一个装饰器工厂.装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用
    return function (target) { //  这是装饰器
        // do something with "target" and "value"...
    }
}

function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called", '|', descriptor);
    }
}

/**
 * 我的装饰器工厂
 * 
 * @param {string} params 装饰器参数
 * @returns
 */
function myDecorator(params: string) {
    console.log('myDecorator(): evaluated', params);
    /**
     * target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
     * propertyKey: 成员的名字
     * descriptor: 成员的属性描述符
     *  */
    return function (target, propertyKey: string/**, descriptor: PropertyDescriptor */) {
        console.log('myDecorator', '|', target, '|', propertyKey);
    }
}

/**
 * 这里的@enumerable(false)是一个装饰器工厂。 
 * 当装饰器 @enumerable(false)被调用时，它会修改属性描述符的enumerable属性。
 * 
 * @param {boolean} value
 * @returns
 */
function enumerable(value: boolean) {
    console.log("enumerable(): evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
        console.log("enumerable(): called");
    };
}

/**
 * 访问器装饰器
 * 
 * @param {boolean} value
 * @returns
 */
function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

import "reflect-metadata";

const formatMetadataKey = Symbol("format");

/**
 * 这个@format("Hello, %s")装饰器是个 装饰器工厂。 
 * 当 @format("Hello, %s")被调用时，它添加一条这个属性的元数据，通过reflect-metadata库里的Reflect.metadata函数。 
 * 当 getFormat被调用时，它读取格式的元数据。
 * 
 * @param {string} formatString
 * @returns
 */
function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}


/**
 * ### 类装饰器
 * ```
 * 类装饰器在类声明之前被声明（紧靠着类声明）。 
 * 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 
 * 类装饰器不能用在声明文件中( .d.ts)，也不能用在任何外部上下文中（比如declare的类）。
 * 类装饰器表达式会在运行时(sintak:程序启动)当作函数被调用，类的构造函数作为其唯一的参数。
 * 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
 * ```
 * @param {Function} constructor
 */
function sealed(constructor: Function) {
    console.log('function sealed(constructor: Function)');
    // 当@sealed被执行的时候，它将密封此类的构造函数和原型。(注：参见Object.seal)
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class C {
    // // ----访问器装饰器
    // private _x: number;
    // private _y: number;
    // constructor(x: number, y: number) {
    //     this._x = x;
    //     this._y = y;
    // }

    // @configurable(false)
    // get x() { return this._x; }

    // @configurable(false)
    // get y() { return this._y; }
    // // ----访问器装饰器

    // ----属性装饰器
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
    // ----属性装饰器

    // ----方法装饰器
    // @enumerable(false)  // evaluated中第一个evaluated，called中最后一个called    
    @f()  // 方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。 方法装饰器不能用在声明文件( .d.ts)，重载或者任何外部上下文（比如declare的类）中。
    @g() @myDecorator('Hello-method')
    @enumerable(false)  // evaluated中最后一个evaluated，called中第一个called
    method() { }

    @myDecorator('Hello-staticMethod')
    static staticMethod() { }
    // ----方法装饰器

}

var r = new C('myMessage').greet();
console.log(r);

// ### 参数装饰器
console.log('*** 参数装饰器');
const requiredMetadataKey = Symbol("required");

/**
 * 参数装饰器声明在一个参数声明之前（紧靠着参数声明）。 参数装饰器应用于类构造函数或方法声明。 参数装饰器不能用在声明文件（.d.ts），重载或其它外部上下文（比如 declare的类）里。
 * 参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
 *  对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 *  成员的名字。
 *  参数在函数参数列表中的索引。
 * | 注意  参数装饰器只能用来监视一个方法的参数是否被传入。
 * 参数装饰器的返回值会被忽略。
 * 
 * @param {Object} target
 * @param {(string | symbol)} propertyKey
 * @param {number} parameterIndex
 */
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }

        return method.apply(this, arguments);
    }
}

class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    // @validate
    greet( @required name: string) {
        return "Hello " + name + ", " + this.greeting;
    }
}

console.log(new Greeter('I am come back').greet('Jack'));

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
