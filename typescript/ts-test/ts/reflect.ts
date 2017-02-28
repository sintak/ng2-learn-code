import "reflect-metadata";

// 总结： 反射元数据，就是为类、方法、属性添加元数据，作为额外的少量数据存储区

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


const formatMetadataKey = Symbol("format");

/**
 * ## 这个@format("Hello, %s")装饰器是个 装饰器工厂。 
 * 
 * 当 @format("Hello, %s")被调用时，它添加一条这个属性的元数据，通过reflect-metadata库里的Reflect.metadata函数。 
 * （当 getFormat被调用时，它读取格式的元数据。）
 * 
 * @param {string} formatString
 * @returns
 */
function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

/**
 * 获取target对象名叫'greeting'的元数据值（Hello, %s）
 * 
 * @param {*} target 
 * @param {string} propertyKey 
 * @returns 
 */
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
console.log(r);  // Hello, myMessage

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

// 简单测试

function dataMember(target, name: string) {
    console.log("dataMember(): evaluated");
    return {function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("dataMember(): called", '|', target);
        console.log("dataMember(): called", '|', propertyKey);
        console.log("dataMember(): called", '|', descriptor);
    }}

}

function dataMember1(formatString) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

// class Company {
//     @dataMember1('')
//     public name: string;

//     @dataMember
//     public people: Person[];
// }

class Person {
    // ...
}

class ForP {
    @prop
    name = '';

    @prop
    password = '';

    @prop
    age;
    
}

function prop(target, name: string) {
    Object.defineProperty(target, name, {
        enumerable: true,
        configurable: true,
        writable: true
    })
}

let data = Object.getOwnPropertyNames(ForP.prototype)
console.log(data);  // 输出： [ 'constructor', 'name', 'password' ]