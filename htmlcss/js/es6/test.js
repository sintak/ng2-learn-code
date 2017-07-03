var globalVar = 111111111;

class IA {
    constructor() {}

    work() {

    }
}

class A {
    test() {
        console.log('i am A');
    }
}

class B extends A{
    test()
    {
        super.test();
        console.log('i am B');

    }

    test1() {
        console.log('i am B. 1');   
        console.log(globalVar);     
    }
}

class C extends B {
    test1() {
        console.log('i am c. 1');   
    }
}

var bb = new B();
bb.test();
bb.test1();

let aa = new B();
aa.test();

let cc = new C;
cc.test1();