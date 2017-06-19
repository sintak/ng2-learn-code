namespace SPACE1.SP {

    export class AAB {

        msg: string = "hello";
        age: string;
        constructor(private name: string) {
            this.msg = name;
            console.log("constructor");
        }

        func() {
            console.log(this.msg);
            // console.log(msg); not ok
            // console.log(name); not ok
            console.log(this.name);
            console.log(this.age);
        }
    }

}

namespace SPACE1.SP {

    export class AABC {

        msg: string = "hello";
        constructor(name: string) {
            this.msg = name;
            console.log("constructor");
        }

        func() {
            console.log(this.msg);
        }
    }

}

var a = new SPACE1.SP.AAB("sintak");
a.func();
// -------
namespace SPACE2 {
    // 不export导出就没法使用
    export class BBB {

        msg: string = "hello";
        constructor(name: string) {
            this.msg = name;
            console.log("constructor");
        }

        func() {
            console.log(this.msg);
        }
    }
}


namespace SPACE2 {

    class BBBBase {
        id: string;
        constructor() {

        }
    }

    export class BBBA extends BBBBase {

        msg: string = "hello";

        buf1 = [1, 3, 333];

        BBBA.prototype.buf2 = [11, 444, 55];
        self1 = this;

        constructor(name: string) {
            super();
            this.msg = name;

            this.buf3 = [333, 333, 333];

            // this.self = this; not ok

            console.log("BBBA constructor");
        }

        func() {
            console.log("func", this.msg);

            // var bbba = new SPACE2.BBB("KodeInner");
            // bbba.func();


            setTimeout(function (thisArg) {
                console.log("setTimeout", thisArg.msg);  // ok
                // console.log("setTimeout",self.msg); not ok

            }, 1000, this);

            var self = this;

            setTimeout(function () {
                console.log("setTimeout2", self.msg);  // ok

            }, 1000);



        }


        invokeCallback(callback, thisArg) {
            //callback.call(thisArg,22222222222); //ok 。 但CEF不知道怎么调用call方法，没法用这中办法解决
            callback(11111111111111);
        }
        // 

        cb1(data) {
            console.log("q", this.msg);  // undefined
            console.log("====================", this.msg);
            console.log("w", BBBA.prototype.msg);  // undefined
            console.log("====================", this.msg);
            console.log("e", BBBA.prototype.buf);  // ok
            console.log("====================", this.msg);
            // console.log("fffffffff",BBBA.prototype.self.buf); not ok
            console.log("r", BBBA.prototype.buf1);  // undefined
            console.log("r", this.buf1);  // undefined
            console.log("====================", this.msg);
            console.log("t", BBBA.prototype.buf2);  // undefined
            console.log("t", this.buf2);  // undefined
            console.log("====================", this.msg);
            console.log("t", self1.buf3);  // undefined

            console.log(data);
        }

        testCallback() {
            // this.cb1.apply(this);
            console.log("a", this.buf2);  // prototype的属性，在非回调函数
            this.invokeCallback(this.cb1, this);
        }
    }
    BBBA.prototype.buf = [1, 2, 3];

}

var bbba = new SPACE2.BBBA("Kode");
bbba.func();
bbba.testCallback();


// module
declare module "url" {
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }

    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}

declare module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export let sep: string;
}

// prototype方法访问的this.property属性也是prototype属性，而不是this的属性
// OS2X.prototype.IsOS2X = function (dataArray) {
//     var self = this;
//     this.isValid = dataArray[0] == 0x01 && dataArray[1] == 0x02;
//     return this.isValid;
// }