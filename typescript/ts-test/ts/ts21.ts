
interface A {
    k1: string;
    k2: string;
    k3: number;
}

// 从A中取一部分属性，类型不变 (A[P] 是上面讲的查找类型)
// 结果: type A_var1 = { k1: string, k3: number }
type A_var1 = {  // 意思： 定义一个类型A_var1， 该类型含有k1和k3属性，并且属性的类型保留为原始的类型
    [P in "k1" | "k3"]: A[P];
}

// 从A中取所有属性， 类型改为number
// 结果: type A_var1 = { k1: number, k2: number, k3: number }
// **注意** keyof / Mapped type / 泛型一起使用时有一些特殊规则。建议读一下最后一部分 "DeepReadonly 是怎样展开的"
type A_var2 = {  // 意思： 定义一个类型A_var1， 该类型含有A里所有属性，并且所有属性的类型改为number
    [P in keyof A]: number;
}

// 从A中取所有属性， 类型改为相应的Promise (TS 2.1 release note中的Deferred是这个的泛型版)
type A_var3 = {
    [P in keyof A]: Promise<A[P]>;
}

// ## Readonly的强化版: DeepReadonly
interface A {
    k1: string;
    k2: string;
    k3: number;
}

// 从A中取一部分属性，类型不变 (A[P] 是上面讲的查找类型)
// 结果: type A_var1 = { k1: string, k3: number }
type A_var11 = {
    [P in "k1" | "k3"]: A[P];
}

// 从A中取所有属性， 类型改为number
// 结果: type A_var1 = { k1: number, k2: number, k3: number }
// **注意** keyof / Mapped type / 泛型一起使用时有一些特殊规则。建议读一下最后一部分 "DeepReadonly 是怎样展开的"
type A_var21 = {
    [P in keyof A]: number;
}

// 从A中取所有属性， 类型改为相应的Promise (TS 2.1 release note中的Deferred是这个的泛型版)
type A_var31 = {
    [P in keyof A]: Promise<A[P]>;
}


// ------------------------------------

// ## keyof和查找类型

interface Person {
    name: string;
    age: number;
    location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // "length" | "push" | "pop" | "concat" | ...
type K3 = keyof { [x: string]: Person };  // string
console.log()

type P1 = Person["name"];  // string
type P2 = Person["name" | "age"];  // string | number
type P3 = string["charAt"];  // (pos: number) => string
type P4 = string[]["push"];  // (...items: string[]) => number
type P5 = string[][0];  // string


function getProperty<T, K extends keyof T>(obj: T, key: K) {  // key必须是T中含有的属性名
    return obj[key];  // 推断类型是T[K]
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value;
}

let x = { foo: 10, bar: "hello!" };

let foo = getProperty(x, "foo"); // number
console.log(foo)
let bar = getProperty(x, "bar"); // string

// let oops = getProperty(x, "wargarbl"); // 错误！"wargarbl"不存在"foo" | "bar"中

// setProperty(x, "foo", "string"); // 错误！, 类型是number而非string


// ## 映射类型
// 一个常见的任务是使用现有类型并使其每个属性完全可选。假设我们有一个Person：
// interface Person {
//     name: string;
//     age: number;
//     location: string;
// }

// type Partial<T> = {
//     [P in keyof T]?: T[P];
// };

type PartialPerson = Partial<Person>;

// 保持类型相同，但每个属性是只读的。
// type Readonly<T> = {
//     readonly [P in keyof T]: T[P];
// };

// 相同的属性名称，但使值是一个Promise，而不是一个具体的值
type Deferred<T> = {
    [P in keyof T]: Promise<T[P]>;
};

// 为T的属性添加代理
type Proxify<T> = {
    [P in keyof T]: { get(): T[P]; set(v: T[P]): void }
};
// function assign<T>(obj: T, props: Partial<T>): void
// function freeze<T>(obj: T): Readonly<T>

// 从T中选取一组属性K
declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;

// const nameAndAgeOnly = pick(person, "name", "age");  // { name: string, age: number }

// 对于类型T的每个属性K，将其转换为U
// function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> 

const names = { foo: "hello", bar: "world", baz: "bye" };
// const lengths = mapObject(names, s => s.length);  // { foo: number, bar: number, baz: number }


// ---------------------

let t = {} as Proxify<Person>;
// t.age
for (var key in t) {
    console.log(key)
    if (t.hasOwnProperty(key)) {
        var element = t[key];
        
    }
}

// ---------

// ----------------------
type AA =  1 | 2 | "";
// let aa: AA = Number('1');

// 
class A {
    name;
    age;
}

interface IA {
    name;
    age;
}

for (var key in A) {
    console.log(key)
}

function fn<K>(obj: K): { [P in keyof K]: boolean } { /* ... */ return <any>1; }
