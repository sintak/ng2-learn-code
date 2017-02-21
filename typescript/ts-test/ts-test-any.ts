

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
 
function merge<T1, T2>(obj1: T1, obj2: T2): T1 & T2 {
    Object.keys(obj2).forEach(key => {
        obj1[key] = obj2[key];
    });
    return obj1 as T1 & T2;
}

var c: Counter = merge(
    (start: number) => { return 'Kode ' + start}, 
    {
        interval: 555,
        reset: () => {console.log('reset() 5');}
    }
    );

console.log(c(555));
console.log(c.interval);
c.reset();
