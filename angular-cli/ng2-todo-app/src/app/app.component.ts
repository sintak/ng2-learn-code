import { Component } from '@angular/core';
import 'reflect-metadata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!1';
  // demo: Demo;
  // constructor() {
  //   this.demo = new Demo();  // output ->  attr1 type: String
  // }

}

function logType(target: any, key: string) {
  var t = Reflect.getMetadata("design:type", target, key);
  console.log(`${key} type: ${t.name}`);
}

class Demo {
  @logType // apply property decorator
  public attr1: string;
}

// -------

function logParamTypes(target: any, key: string) {
  var types = Reflect.getMetadata("design:paramtypes", target, key);
  var s = types.map(a => a.name).join();
  console.log(`${key} param types: ${s}`);
}

class Foo { }
interface IFoo { }

class Demo1 {
  @logParamTypes // apply parameter decorator
  doSomething(
    param1: string,
    param2: number,
    param3: Foo,
    param4: { test: string },
    param5: IFoo,
    param6: Function,
    param7: (a: number) => void,
  ): number {
    return 1
  }
}

// -------
function logT(target: Function, key: string, value: any) {
  // target === C.prototype
  // key === "foo"
  // value === Object.getOwnPropertyDescriptor(C.prototype, "foo")
  return {
    value: function (...args: any[]) {
      // convert list of foo arguments to string
      var a = args.map(a => JSON.stringify(a)).join();

      // invoke foo() and get its return value
      var result = value.value.apply(this, args);

      // convert result to string
      var r = JSON.stringify(result);

      // return the result of invoking foo
      console.log(`Call: ${key}(${a}) => ${r}`);

      return result;
    }
  };
}

// 未知问题，暂时确定为TypeScript的问题
// class C {
//   @logT
//   foo(n: number): number {
//     return n * 2;
//   }
// }