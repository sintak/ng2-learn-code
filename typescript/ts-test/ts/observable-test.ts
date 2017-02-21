import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs/Rx';

namespace ObservableTest {

    var observable = Observable.create(function (observer) {
        try {
            observer.next(1);
            observer.next(2);
            observer.next(3);
            setTimeout(() => {
                observer.next(4);
                // observer.error('I am error');
                observer.complete();
            }, 1000);
        } catch (error) {
            observer.error(error);
        }
    });

    console.log('just before subscribe');
    observable.subscribe({
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    });
    console.log('just after subscribe');

    // output:
    // just before subscribe
    // got value 1
    // got value 2
    // got value 3
    // just after subscribe
    // got value 4
    // done

    // ------------------------

    var foo = Observable.create(function (observer) { 
        console.log('Hello');
        setTimeout(() => {
            observer.next(42);
        }, 3000);
    });//.share();//看源码知道.share()操作符是.publish().refcount()调用链的包装
       // refcount本质上在后台维护着一个引用计数器，当一个subscription需要取消订阅或者销毁的时候，发出一个正确的动作。
       // 通过使用share操作符，我们保证引用的是同一个资源。 而不是subscribers在不同的时间点订阅，他们会收到准确的相同的数据。

    foo.subscribe(function (x) { // 每对create出来的对象进行subscribe一次都会调用create里的创建动作function
        console.log(x);
    });
    foo.subscribe(function (y) {
        console.log(y);
    });

    // output:
    // Hello
    // 42
    // Hello
    // 42
}
