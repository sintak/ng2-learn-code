var SPACE1;
(function (SPACE1) {
    var SP;
    (function (SP) {
        class AAB {
            constructor(name) {
                this.name = name;
                this.msg = "hello";
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
        SP.AAB = AAB;
    })(SP = SPACE1.SP || (SPACE1.SP = {}));
})(SPACE1 || (SPACE1 = {}));
(function (SPACE1) {
    var SP;
    (function (SP) {
        class AABC {
            constructor(name) {
                this.msg = "hello";
                this.msg = name;
                console.log("constructor");
            }
            func() {
                console.log(this.msg);
            }
        }
        SP.AABC = AABC;
    })(SP = SPACE1.SP || (SPACE1.SP = {}));
})(SPACE1 || (SPACE1 = {}));
var a = new SPACE1.SP.AAB("sintak");
a.func();
// -------
var SPACE2;
(function (SPACE2) {
    // 不export导出就没法使用
    class BBB {
        constructor(name) {
            this.msg = "hello";
            this.msg = name;
            console.log("constructor");
        }
        func() {
            console.log(this.msg);
        }
    }
    SPACE2.BBB = BBB;
})(SPACE2 || (SPACE2 = {}));
(function (SPACE2) {
    class BBBBase {
        constructor() {
        }
    }
    class BBBA extends BBBBase {
        constructor(name) {
            super();
            this.msg = "hello";
            this.buf1 = [1, 3, 333];
            this.buf2 = [11, 444, 55];
            this.self1 = this;
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
                console.log("setTimeout", thisArg.msg); // ok
                // console.log("setTimeout",self.msg); not ok
            }, 1000, this);
            var self = this;
            setTimeout(function () {
                console.log("setTimeout2", self.msg); // ok
            }, 1000);
        }
        invokeCallback(callback, thisArg) {
            //callback.call(thisArg,22222222222); //ok 。 但CEF不知道怎么调用call方法，没法用这中办法解决
            callback(11111111111111);
        }
        // 
        cb1(data) {
            console.log("q", this.msg); // undefined
            console.log("====================", this.msg);
            console.log("w", BBBA.prototype.msg); // undefined
            console.log("====================", this.msg);
            console.log("e", BBBA.prototype.buf); // ok
            console.log("====================", this.msg);
            // console.log("fffffffff",BBBA.prototype.self.buf); not ok
            console.log("r", BBBA.prototype.buf1); // undefined
            console.log("r", this.buf1); // undefined
            console.log("====================", this.msg);
            console.log("t", BBBA.prototype.buf2); // undefined
            console.log("t", this.buf2); // undefined
            console.log("====================", this.msg);
            console.log("t", self1.buf3); // undefined
            console.log(data);
        }
        testCallback() {
            // this.cb1.apply(this);
            console.log("a", this.buf2); // prototype的属性，在非回调函数
            this.invokeCallback(this.cb1, this);
        }
    }
    SPACE2.BBBA = BBBA;
    BBBA.prototype.buf = [1, 2, 3];
})(SPACE2 || (SPACE2 = {}));
var bbba = new SPACE2.BBBA("Kode");
bbba.func();
bbba.testCallback();
// prototype方法访问的this.property属性也是prototype属性，而不是this的属性
// OS2X.prototype.IsOS2X = function (dataArray) {
//     var self = this;
//     this.isValid = dataArray[0] == 0x01 && dataArray[1] == 0x02;
//     return this.isValid;
// } 
