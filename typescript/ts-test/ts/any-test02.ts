declare var window: Window;
import 'reflect-metadata'

class A {
    r: {
        "rsId",
        "time",
    };

    r1: {
        rsId1,
        time1
    }

    constructor() {
        this.r = { rsId: 0, time: 'r0' };
        this.r1 = { rsId1: 'r1', time1: 1 };

        for (var k in this.r) {
            if (this.r.hasOwnProperty(k)) {
                var element = this.r[k];
                console.log(element);
            }
        }
        for (var k in this.r1) {
            if (this.r1.hasOwnProperty(k)) {
                var element = this.r1[k];
                console.log(element);
            }
        }
    }
}

new A();

type BBB = { a: string, b };
type BBBB = { 'a', b: number };
declare type BufferEncoding1 = "ascii" | "utf8" | "utf16le" | "ucs2" | "binary" | "hex";

interface IComField {
    "name",//公司名称
    "tel",//公司电话
    "fax",//公司传真
    "add",//公司地址
    "www",//公司网址
    "domain",//公司行业
    "desc"//公司简介
}

type TComField = {
    "name",//公司名称
    "tel",//公司电话
    "fax",//公司传真
    "add",//公司地址
    "www",//公司网址
    "domain",//公司行业
    "desc"//公司简介
}

class CComField {

    name;//公司名称
    "tel";//公司电话
    "fax";//公司传真
    "add";//公司地址
    "www";//公司网址
    "domain";//公司行业
    "desc"//公司简介
}

function FComField() {

    "name";//公司名称
    "tel";//公司电话
    "fax";//公司传真
    "add";//公司地址
    "www";//公司网址
    "domain";//公司行业
    "desc"//公司简介
}

let FComField2 = function () {

    "name";//公司名称
    "tel";//公司电话
    "fax";//公司传真
    "add";//公司地址
    "www";//公司网址
    "domain";//公司行业
    "desc"//公司简介
}

class B {


    FComField1 = function () {

        name;//公司名称
        "tel";//公司电话
        "fax";//公司传真
        "add";//公司地址
        "www";//公司网址
        "domain";//公司行业
        "desc"//公司简介
    }



    //字段设置
    comField = [
        "name",//公司名称
        "tel",//公司电话
        "fax",//公司传真
        "add",//公司地址
        "www",//公司网址
        "domain",//公司行业
        "desc"//公司简介
    ];
    comData = {};
    private isLogin = false;
    get ComField(): Readonly<TComField> {
        // return this.comData as TComField;
        return this.comData as Readonly<TComField>;
    }

    constructor(private context: Object) {
        // let com: TComField;
        // let com1: IComField;
        // Object.freeze
        // for (var key in com) {
        //     console.log(key)
        //     if (com.hasOwnProperty(key)) {
        //         var element = com[key];

        //     }
        // }

        // for (var key in IComField) {
        //     if (T.hasOwnProperty(key)) {
        //         var element = T[key];

        //     }
        // }

        // Reflect.decorate

        // let ic = this.getInstance("TComField");
        // console.log(ic);
        // for (var key in ic) {
        //     console.log(key);
        //     if (ic.hasOwnProperty(key)) {
        //         var element = ic[key];

        //     }
        // }

        // Object.keys(this).forEach(prop => console.log(prop))

        // let v = <CComField>{ name: 'Kode', tel: 13888888888, abcde: 14332 };

        let c = new CComField();
        c.desc = "hello"
        for (var key in c) {
            console.log(key)
            if (this.FComField1.prototype.hasOwnProperty(key)) {
                var element = this.FComField1.prototype[key];

            }
        }

        let o = Object.create(FComField.prototype)
        console.log(o)

        let cc: IComField = <any>{ name: 'Kode', tel: 13999999999, abcde: 14332 };
        for (var key in cc) {
            if (cc.hasOwnProperty(key)) {
                var element = cc[key];
                console.log(element)
            }
        }

        console.log('5---------------')
        

        let result= this.filterDataT<IComField>({ name: 'KodeNew', tel: 13777777777, abcde: 1111 },
            { name: 'Kode', tel: 13666666666, add: 'cen cun', opqr: 123123 });
        console.log(result)
        console.log(result.valueOf())
        console.log((result as IComField).name)
        

        console.log('6---------------')

        Object.keys(result).forEach(r => console.log(r));

        console.log('7---------------')

        console.log('7---------------')

        this.filterData(this.comField, { name: 'Kode', tel: 13888888888, abcde: 14332 }, this.comData)
        console.log(this)
    }

    getInstance(name: string, ...args: any[]) {
        var instance = Object.create(window[name].prototype);
        instance.constructor.apply(instance, args);
        return instance;
    }

    filterDataT<T>(data: {}, obj?: {}): T  | boolean {
        // console.log(arguments.callee.name);

        if (obj) {
            var ret = false;
            if (typeof data == "object") {
                obj = Object.assign(obj, data);
                ret = true;
            }
            return ret ? <T>obj : false;
        }
        else {
            let o: T = <T>{};
            if (typeof data == "object") {
                o = <T>data;
            }
            return o;
        }
    }

    /**
     * 过滤数据
     * @param field array 限定的VO字段模版
     * @param data object 原始数据对象
     * @param obj object 要修改的VO数据引用，如果不存在即返回新的对象 [可选]
     * @returns bool|object
     */
    filterData(field: string[], data: {}, obj?: {}) {
        if (obj) {  // 如果有要修改的数据引用
            var ret = false;
            if (typeof data == "object") {
                var len = field.length;
                for (var i = 0; i < len; i++) {
                    var k = field[i];
                    if (data[k] === undefined) {
                        continue;
                    }
                    if (data[k] != obj[k]) {
                        obj[k] = data[k];
                        ret = true;  // 表示数据有更新
                    }
                }
            }
            return ret ? obj : false;
        } else {
            // 构建一个对象返回
            var copy = {};
            if (typeof data == "object") {
                var len = field.length;
                for (var i = 0; i < len; i++) {
                    var k = field[i];
                    if (data[k] === undefined) {
                        continue;
                    }
                    copy[k] = data[k];
                }
            }
            return copy;
        }

    }
}

new B(this);


function TypeA() {
    "afa";
    "fsf"
}

console.log(TypeA.name);

let o1 = { a: 'aaa', b: 1, c: '777'};
let o2 = { a: 2, b: 'bbb', d: 777};
let o3 = { ...o2, oo: 'o3' }
let merged = { ...o1, ...o2 };
let merged1 = { ...o1, ...o3 };
o1.a = 'zzzzzzzzzzzzz'
console.log(merged);  // 输出： { a: 2, b: 'bbb', c: '777', d: 777 }
o1.a = 'yyyyyyyyyyyyyy'
console.log(merged1);


let ooo =<any>{};
console.log(ooo!.a);

class BC {
    private a1 = "";
    public a2 = "";

}
let bc =  new BC();
let array = Object.getOwnPropertyNames(bc);
console.log(array) ;
console.log(array[0] === "a1") ;
console.log(array[1] === "a2") ;
console.log(array[1] === "a3") ;

class BCD {
    private a1;
    public a2;

}
let bcd = new BCD();
let array1 = Object.getOwnPropertyNames(bcd);
console.log('array1:', array1) ;


class CD {
    get a() {return void 0;};
    set a(v) {}

}
console.log(Object.keys(CD.prototype))
