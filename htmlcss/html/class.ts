namespace SPACE1.SP{

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

namespace SPACE1.SP{

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
namespace SPACE2{
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


namespace SPACE2{

    export class BBBA {
        
        msg: string = "hello";
        constructor(name: string) {
            // var self = this; not ok
            this.msg = name;
            console.log("BBBA constructor");
        }

        func() {
            console.log("func", this.msg);
                        
            // var bbba = new SPACE2.BBB("KodeInner");
            // bbba.func();


            setTimeout(function(thisArg) {
                console.log("setTimeout",thisArg.msg);  // ok
                // console.log("setTimeout",self.msg); not ok

            }, 1000, this);

            var self = this;

            setTimeout(function() {
                console.log("setTimeout2",self.msg);  // ok

            }, 1000);

            

        }


        invokeCallback(callback) {
            callback.call(this,123123123);
        }
        
        cb1(data) {
            console.log("fffffffff",this.msg);
            console.log(data);
        }

        testCallback(){
            // this.cb1.apply(this);
            this.invokeCallback(this.cb1);
        }
    }
}

var bbba = new SPACE2.BBBA("Kode");
bbba.func();
bbba.testCallback();