import {Subject} from 'rxjs/Rx'
class EventArg {
    message: string;
}

class CompletedEventArg extends EventArg{

    constructor(msg: string) {
        super();
        this.completeMsg = msg;
        this.message = this.completeMsg;
    }
    completeMsg: string;
}
let  sub: Subject<EventArg> = new Subject();
sub.subscribe(obs => console.log(obs.message));

class A {

    work() {
        // do work
        
        sub.next(new CompletedEventArg('A工作完成'))
    }
}

class B {

    work() {
        // do work

        sub.next(new CompletedEventArg('B工作完成'))
    }
}

new A().work();
new B().work();
