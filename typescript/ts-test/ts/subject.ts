// ## 什么是Subject？ 在RxJS中，Subject是一类特殊的Observable，它可以向多个Observer多路推送数值。
//      普通的Observable并不具备多路推送的能力（每一个Observer都有自己独立的执行环境），而Subject可以共享一个执行环境。
// ## Subject是一种可以多路推送的可观察对象。与EventEmitter类似，Subject维护着自己的Observer。
// ## 每一个Subject都是一个Observable（可观察对象） 对于一个Subject，你可以订阅（subscribe）它，Observer会和往常一样接收到数据。
//      从Observer的视角看，它并不能区分自己的执行环境是普通Observable的单路推送还是基于Subject的多路推送。
// ## Subject的内部实现中，并不会在被订阅（subscribe）后创建新的执行环境。
//      它仅仅会把新的Observer注册在由它本身维护的Observer列表中，这和其他语言、库中的addListener机制类似。
// ## 每一个Subject也可以作为Observer（观察者） Subject同样也是一个由next(v)，error(e)，和 complete()这些方法组成的对象。
//      调用next(theValue)方法后，Subject会向所有已经在其上注册的Observer多路推送theValue。


import { Observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs/Rx';

namespace Subject0 {

    interface IEvent {
        id: string;
    }

    interface IMoved extends IEvent {
        moveMsg: string;
    }
    interface IRemoved extends IEvent {
        removedMsg: string;
    }

    class EventService {
        public moved$: Subject<IMoved> = new Subject<IMoved>();
        public removed$: Subject<IRemoved> = new Subject<IRemoved>();
    }

    // subscribe(observer: PartialObserver<T>): Subscription;
    // subscribe(next ?: (value: T) => void, error ?: (error: any) => void, complete ?: () => void): Subscription;

    class Test {
        static main(): void {
            let aservice = new EventService();
            aservice.moved$.subscribe(obs => console.log('moved$', obs, obs.moveMsg));
            aservice.removed$.subscribe(obs => console.log('removed$', obs, obs.removedMsg));

            aservice.moved$.next({ id: '1', moveMsg: 'hello moved!' });
        }
    }
    Test.main();

    class Worker {

        eventService: EventService = new EventService();

        public init() {
            this.moveHandlerInit();
            this.removeHandlerInit();
        }

        private moveHandlerInit() {
            let s = 'this is moveHandler():';
            this.eventService.moved$.subscribe(
                obs => {
                    console.log(s, obs);
                }
            )
        }

        private removeHandlerInit() {
            let s = 'this is removeHandler():';
            this.eventService.moved$.subscribe(
                obs => {
                    console.log(s, obs);
                }
            )
            this.eventService.removed$.subscribe(
                obs => {
                    console.log(s, obs);
                }
            );

            let subs = this.eventService.removed$.subscribe(
                obs => {
                    console.log(s, obs);
                }
            );
            subs.unsubscribe(); // 根据句柄取消订阅
        }

        move() {
            this.eventService.moved$.next({ id: '1', moveMsg: 'hello moved!' });
        }

        remove() {
            this.eventService.removed$.next({ id: '2', removedMsg: 'user removed' });
        }
    }

    let worker = new Worker();

    worker.init();
    worker.move();
    worker.remove();

}

console.log('---------------------------------------------------------- subject 1');

namespace Subject1 {

    var subject = new Subject();

    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });

    subject.next(1);
    subject.next(2);

    // observerA: 1
    // observerB: 1
    // observerA: 2
    // observerB: 2
}

console.log('---------------------------------------------------------- subject 2');

namespace Subject2 {

    var subject = new Subject();

    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });

    var observable = Observable.from([1, 2, 3]);

    observable.subscribe(subject); // 你可以传递Subject来订阅observable

    // observerA: 1
    // observerB: 1
    // observerA: 2
    // observerB: 2
    // observerA: 3
    // observerB: 3
}
console.log('---------------------------------------------------------- 多路推送的Observable');

namespace MulticastObservable {

    var source = Observable.from([1, 2, 3]);
    var subject = new Subject();
    var multicasted = source.multicast(subject);

    // 通过`subject.subscribe({...})`订阅Subject的Observer：
    multicasted.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    multicasted.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });

    // 让Subject从数据源订阅开始生效：
    multicasted.connect();

    // output:
    // observerA: 1
    // observerB: 1
    // observerA: 2
    // observerB: 2
    // observerA: 3
    // observerB: 3
}

console.log('---------------------------------------------------------- 引用计数 ref count');
/**
 * ## 引用计数
 * 通过手动调用connect()返回的Subscription控制执行十分繁杂。
 * 通常，我们希望在有第一个Observer订阅Subject后自动connnect，当所有Observer都取消订阅后终止这个Subject。
 */
namespace RefCount {

    var source = Observable.interval(500);
    var subject = new Subject();
    var refCounted = source.multicast(subject).refCount();  // 每500毫秒更新一次的引用计数
    var subscription1, subscription2, subscriptionConnect;

    console.log('observerA subscribed');
    subscription1 = refCounted.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });

    setTimeout(() => {
        console.log('observerB subscribed');
        subscription2 = refCounted.subscribe({
            next: (v) => console.log('observerB: ' + v)  // observerB: 1   observerB: 2
        });
    }, 600);

    setTimeout(() => {
        console.log('observerA unsubscribed');
        subscription1.unsubscribe();
    }, 1200);

    setTimeout(() => {
        console.log('observerB unsubscribed');
        subscription2.unsubscribe();
    }, 2000);

    // output:
    // observerA: 0
    // observerB subscribed
    // observerA: 1
    // observerB: 1
    // observerA unsubscribed
    // observerB: 2
    // observerB unsubscribed
}


console.log('---------------------------------------------------------- BehaviorSubject');
/**
 * ## BehaviorSubject
 * BehaviorSubject是Subject的一个衍生类，具有“最新的值”的概念。它总是保存最近向数据消费者发送的值， 
 *   当一个Observer订阅后，它会即刻从BehaviorSubject收到“最新的值”。 
 * 
 * BehaviorSubjects非常适于表示“随时间推移的值”。举一个形象的例子，Subject表示一个人的生日， 
 *   而Behavior则表示一个人的岁数。（生日只是一天，一个人的岁数会保持到下一次生日之前。）
 */
namespace BehaviorSubjectTest {

    // 下面例子中，展示了如何用 0初始化BehaviorSubject，当Observer订阅它时，0是第一个被推送的值。
    // 紧接着，在第二个Observer订阅BehaviorSubject之前，它推送了2，虽然订阅在推送2之后，但是第二个Observer仍然能接受到2：

    var subject = new BehaviorSubject(0 /* 初始值 */);

    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });  // observerA: 0

    subject.next(111);  // observerA: 1
    subject.next(222);  // observerA: 2

    subject.subscribe({  // 后来订阅的也能收到早期next的(222)
        next: (v) => console.log('observerB: ' + v)
    });  // observerB: 2

    subject.next(333);  // observerA: 3  observerB: 3

    // observerA: 0
    // observerA: 1
    // observerA: 2
    // observerB: 2
    // observerA: 3
    // observerB: 3
}

console.log('---------------------------------------------------------- ReplaySubject');
/**
 * ## ReplaySubject
 * ReplaySubject 如同于BehaviorSubject是 Subject 的子类。通过 ReplaySubject可以向新的订阅者推送旧数值，
 *   就像一个录像机ReplaySubject可以记录Observable的一部分状态（过去时间内推送的值）。
 * 
 *   .一个ReplaySubject可以记录Observable执行过程中推送的多个值，并向新的订阅者回放它们。
 */
namespace ReplaySubjectTest {
    var subject = new ReplaySubject(3 /* 回放数量 */);

    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);

    subject.subscribe({  // 后来的订阅者可以也可以得到前期的next推送数据
        next: (v) => console.log('observerB: ' + v)
    });

    subject.next(5);

    // output:
    // observerA: 1
    // observerA: 2
    // observerA: 3
    // observerA: 4
    // observerB: 2
    // observerB: 3
    // observerB: 4
    // observerA: 5
    // observerB: 5
}

console.log('---------------------------------------------------------- AsyncSubject');
/**
 * ## AsyncSubject
 * AsyncSubject是Subject的另外一个衍生类，Observable仅会在执行完成后，推送执行环境中的最后一个值。
 * （AsyncSubject 与 last() 操作符相似，等待完成通知后推送执行过程的最后一个值。）
 */
namespace AsyncSubjectTest {
    var subject = new AsyncSubject();

    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);

    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });

    subject.next(5);
    subject.complete();  // 完成后才推送值

    // observerA: 5
    // observerB: 5
}

console.log('---------------------------------------------------------- Promise');
namespace PromiseTest {

    // let p = Promise.resolve(123321);
    let p = new Promise<string>(
        (resolve, reject) => {
            let isOK = true;
            if (isOK) {
                resolve('is ok');
            }
            else {
                reject('error!!!');
            }
        }
    );
    // let p = Promise.reject(123321);
    p.then(value => console.log(value)).catch(reason => console.log('reason: ', reason));


}
interface PromiseConstructor11111 {
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
}  // executor就是一个委托对象，这个委托对象的两个参数也是委托对象（委托对象就是方法，可直接调用）
