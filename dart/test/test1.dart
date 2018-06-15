// import 'package:args/args.dart';
// import 'package:lib1/lib1.dart' show foo;  // Import only foo. // show hide as
// import 'dart:html' deferred as hello;  // (deferred as namespace): Lazily loading a library
// import 'package:greetings/hello.dart' deferred as hello;  // 
import 'lib1/lib1.dart';

// Future greet() async {
//   await hello.loadLibrary(); The loadLibrary() function returns a Future.
//   hello.printGreeting();
// }

class Point {
  num x, y, z;

  // Point(num x, num y) {
  //   // There's a better way to do this, stay tuned.
  //   this.x = x;
  //   this.y = y;
  // }

  // main/default constructor 
  // Syntactic sugar for setting x and y
  // before the constructor body runs
  // Point(this.x, this.y);  // ok
  Point(this.x, this.y) {
    
  }

  Point.fromeList(var list): //命名构造函数，格式为Class.name(var param)
            x = list[0], y = list[1], z = list[2]{//使用冒号初始化变量
    }

  Point.from1(num x) : this(x, 0);

  Point.fromJson(Map data) : assert(true) /* : super.fromJson(data) */{
    this.x = data['x'];
    this.y = data['y'];
    this.z = data[888];
  }


    //当然，上面句你也可以简写为：
    //Point.fromeList(var list):this(list[0], list[1], list[2]);

  String toString() => 'x:$x  y:$y  z:$z';
}

class ImmutablePoint {
    static final ImmutablePoint origin = const ImmutablePoint(0, 0); // 创建一个常量对象不能用new，要用const 
    final num x, y;

    const ImmutablePoint(this.x, this.y); // 常量构造函数
}

class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to
  // the _ in front of its name.
  static final Map<String, Logger> _cache =
      <String, Logger>{};

  factory Logger(String name) {  // Factory constructors: 对使用者友好，不用关心是从工厂还是从静态方法创建单例，只管new即可
    if (_cache.containsKey(name)) {
      return _cache[name];
    } else {
      final logger = new Logger._internal(name);
      _cache[name] = logger;
      return logger;
    }
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}

class Rectangle {
  num left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // Define two calculated properties: right and bottom.
  num get right => left + width;
  set right(num value) => left = value - width;
  num get bottom => top + height;
  set bottom(num value) => top = value - height;
}

abstract class Doer {
  // Define instance variables and methods...

  void doSomething(); // Define an abstract method.
}
// A person. The implicit interface contains greet().
class Person {
  // In the interface, but visible only in this library.
  final _name;

  // Not in the interface, since this is a constructor.
  Person(this._name);

  // In the interface.
  String greet(String who) => 'Hello, $who. I am $_name.';
}

// An implementation of the Person interface.
class Impostor implements Person /*, Animal*/ {
  get _name => '';

  // @override
  // String greet(String who) {
  //   return 'Hi $who. Do you know who I am?';
  // }

  // String greet(String who) => 'Hi $who. Do you know who I am?';

  noSuchMethod(Invocation invocation) => 
    print('You tried to use a non-existent member: ' + '${invocation.memberName}');
}

String greetBob(Person person) => person.greet('Bob');

enum Color { red, green, blue }

////////// Mixins（混入）: 把多个对象成员混到一起
class XXX {
  num n = 333333;

  c() => print('XXX.c');
}
class SSS {
  a() {print("S.a");}
}

class AAA extends Object with XXX/*, SSS*/ {
  a(){print("A.a");}
  @deprecated
  b(){print("A.b");}
}

class T = AAA with SSS/*, XXX*/;
//////////

// Callable classes
class WannabeFunction {
  call(String a, String b, String c) => '$a $b $c!';
}

typedef int Compare<T>(T a, T b);

// Metadata: Metadata can appear before a library, class, typedef, type parameter, constructor, factory, function, field, parameter, or variable declaration and before an import or export directive. You can retrieve metadata at runtime using reflection.
class Todooo {
  final String who;
  final String what;

  const Todooo(this.who, this.what);
}

/// test
/// []
@Todooo('seth', 'make this do something')
Future testAny() async {
  // Typedefs
  int sort(int a, int b) => a - b;
  assert(sort is Compare<int>); // True!

  // Callable classes
  var wf = new WannabeFunction();
  var out = wf("Hi","there,","gang");
  print('$out');

  // Generators
  // To implement a synchronous generator function, mark the function body as sync*, 
  // and use yield statements to deliver values:
  Iterable<int> naturalsTo(int n) sync* {
    int k = 0;
    while (k < n) yield k++;
  }

  // To implement an asynchronous generator function, mark the function body as async*, 
  // and use yield statements to deliver values:
  Stream<int> asynchronousNaturalsTo(int n) async* {
    int k = 0;
    while (k < n) yield k++;
  }

  // If your generator is recursive, you can improve its performance by using yield*:
  Iterable<int> naturalsDownFrom(int n) sync* {
    if (n > 0) {
      yield n;
      yield* naturalsDownFrom(n - 1);
    }
  }

  // async
  Future<String> lookUpVersion() async => '1.0.0';
  print('In testAny: version is ${await lookUpVersion()}');

  // await for (varOrType identifier in expression) {
  // // Executes each time the stream emits a value.
  // }
  // The value of expression must have type Stream. Execution proceeds as follows:
  // Wait until the stream emits a value.
  // Execute the body of the for loop, with the variable set to that emitted value.
  // Repeat 1 and 2 until the stream is closed.

  var names = <String>['Seth', 'Kathy', 'Lars'];
  var pages = <String, String>{'index.html': 'Homepage', 'robots.txt': 'Hints for web robots'};

  /// mixins
  var t = new T();
  t.a();
  t.b();
  t.c();
  print(t.n);

  ///
  assert(Color.values.length == 3);

  // factory constructor
  var logger = new Logger('UI');
  logger.log('Button clicked');

  // getter setter
  var r = new Rectangle(1, 1, 1, 1);
  print(r.right);
  r.right++;
  print(r.right);
  

  // Default value
  // Uninitialized variables have an initial value of null. Even variables with numeric types are initially null, because numbers—like everything else in Dart—are objects.
  int lineCount;
  assert(lineCount == null);

  // Booleans
  // Check for NaN.
  var iMeantToDoThis = 0 / 0;
  assert(iMeantToDoThis.isNaN);

  // If and else
  var b5 = new B();
  // if(b5)  // 和C#/JS不一样，you can’t use code like if (nonbooleanValue) or assert (nonbooleanValue). Instead, explicitly check for values, like this:
  if(b5 != null) {
  } else {
    assert(false);
  }
  assert(b5 != null);

  // var a = [1,2,3];  // The analyzer infers that list has type List<int>. If you try to add non-integer objects to this list, the analyzer or runtime raises an error. For more information, read about type inference.
  List<int> a = [1,2,3];
  a.add('hello');  // ??? 实际测试居然可以添加进去
  assert(a is List<Function>);
  print(a);


  var p1 = new Point(2, 2);  // You can omit the new before the constructor. Example: p1 = Point(2, 2).
  var p2 = new Point.fromJson({'x': 1, 'y': 2, 888: 3});
  var p = const ImmutablePoint(2, 2);
  print(p2);
}

printValue(dynamic value) {
  print('the value is $value');
}

testThrowException() {
  try {
    // throw new FormatException('test throw Format Exception!!!!').source = 'suzune';
    throw 'suzune';
  } on OutOfMemoryError {
    print('OutOfMemoryError');
  } on FormatException catch (e, s) {
    print('FormatException: $e, | source: ${e.source}, StackTrace: $s,');
  } on Exception {
    print('Exception');
  } on String catch (e) {
    print('String: $e');
  } catch (e) {
    print('catch1111: $e');
  }
  /*on Object catch(e) {
    print('Object catch: $e');
  } */

  try {
    throw 'Yooooooooo';
  } catch (e) {
    print('throwException() partially handled ${e.runtimeType}.');
    rethrow;
  } finally {}
}

testClasses() {
  var p = new Point(2, 2);
  p.y = 3;
  assert(p.y == 3);
}

testRunes() {
  var clapping = '\u{1f44f}';
  print(clapping);
  print(clapping.codeUnits);
  print(clapping.runes.toList());

  Runes input = new Runes(
      '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}');
  print(new String.fromCharCodes(input));
}

testReverseString() {
  // Splitting with an empty string pattern ('') splits at UTF-16 code unit boundaries and not at rune boundaries[.]
  // var input = "Music \u{1d11e} for the win"; // Music 𝄞 for the win
  // print(input.split('').reversed.join()); // niw eht rof

  // There is an easy fix for this: instead of reversing the individual code-units one can reverse the runes:
  var input1 = "Music \u{1d11e} for the win"; // Music 𝄞 for the win
  print(new String.fromCharCodes(input1.runes.toList().reversed)); // niw eht rof 𝄞 cisuM

  // But that's not all. Runes, too, can have a specific order. This second obstacle is much harder to solve. A simple example:
  var input2 =  'Ame\u{301}lie'; // Amélie
  print(new String.fromCharCodes(input2.runes.toList().reversed)); // eiĺemA
}

testOptionalParameters() {  
    String say(String from, String msg,
      [String device = 'carrier pigeon', String mood]) {
    var result = '$from says $msg';
    if (device != null) {
      result = '$result with a $device';
    }
    if (mood != null) {
      result = '$result (in a $mood mood)';
    }
    return result;
  }
  print(say('Bob', 'Howdy'));

  assert(say('Bob', 'Howdy') ==
    'Bob says Howdy with a carrier pigeon');

  //////////
  void doStuff({  // sintak:花括号是个对象, 而调用时似乎只能通过解构赋值方式匹配。
      List<int> list = const [1, 2, 3],
      Map<String, String> gifts = const {
        'first': 'paper',
        'second': 'cotton',
        'third': 'leather'
        }
      }) {
    print('list:  $list');
    print('gifts: $gifts');
  }
  doStuff();
  doStuff(gifts: {'aaa': 'a11', 'bbb':'b11', 'ccc':'c11'}, list:[4,5,6]);  // 必须通过解构赋值方式指定参数
  

  void doStuff1(List<int> list, Map<String, String> gifts) {
    print(list);
    print(gifts);
  }
  // doStuff1({[4,5,6], {'aaa': 'a11', 'bbb':'b11', 'ccc':'c11'}});
  doStuff1([4,5,6],  {'aaa': 'a11', 'bbb':'b11', 'ccc':'c11'});

  void doStuff11([List<int> list, Map<String, String> gifts]) {
    print(list);
    print(gifts);
  }
  // doStuff1({[4,5,6], {'aaa': 'a11', 'bbb':'b11', 'ccc':'c11'}});
  doStuff11([4,5,6],  {'aaa': 'a11', 'bbb':'b11', 'ccc':'c11'});

  void doStuff2({List<int> list, Map<String, String> gifts}) {
    print(list);
    print(gifts);
  }
  // doStuff1({[4,5,6], {'aaa': 'a11', 'bbb':'b11', 'ccc':'c11'}});
  doStuff2(list:[4,5,6],  gifts:{'aaa': 'a11', 'bbb':'b11', 'ccc':'c11'});
}

void testLexicalClosures() {
  Function makeAdder(num addby) {
    return (num i) => addby + i;
  }

  // Create a function that adds 2.
  var add2 = makeAdder(2);
  var add4 = makeAdder(4);

  assert(add2(3)==5);
  assert(add4(3)==7);
  print('testLexicalClosures end.');
}

//////////////
/// Testing functions for equality
void foo11() {} // A top-level function

class A {
  static void bar() {} // A static method
  void baz() {} // An instance method
}

void testFunctionForEquality() {
  var x;

  // Comparing top-level functions.
  x = foo11;
  assert(foo11 == x);

  // Comparing static methods.
  x = A.bar;
  assert(A.bar == x);

  // Comparing instance methods.
  var v = new A(); // Instance #1 of A
  var w = new A(); // Instance #2 of A
  var y = w;
  x = w.baz;

  // These closures refer to the same instance (#2),
  // so they're equal.
  assert(y.baz == x);

  // These closures refer to different instances,
  // so they're unequal.
  assert(v.baz != w.baz);
}
///////////
class B {}
testOperators() {
  assert(2 + 3 == 5);
  assert(2 - 3 == -1);
  assert(2 * 3 == 6);
  assert(5 / 2 == 2.5); // Result is a double
  assert(5 ~/ 2 == 2); // Result is an int
  assert(5 % 2 == 1); // Remainder

  assert('5/2 = ${5~/2} r ${5%2}' == '5/2 = 2 r 1');

  var b1 = new B();
  var b2 = new B();
  assert(identical(b1, b2) == false);
  assert(b1 is! B == false);

  var b5;  
  b5 ??= b1;  // Assign value to b if b is null; otherwise, b stays the same
  assert(b5 is B);

  String playerName(String name) => name ?? 'Guest';  // (expr1 ?? expr2) If expr1 is non-null, returns its value; otherwise, evaluates and returns the value of expr2.

}


var a = 'hello';
var a1 = r"In a raw string, even \n isn't special."; // r raw 类似C#的@，禁止转义符
// a = 'world';  // error 再top-level只能定义

final b = '''xxxx
yyyy'''; // final：只读。第一次运行时初始化。（类似C# readonly。不过C#的readonly变量能在构造器初始化）
final String b1 = '';
const c = ''; // const：常量。编译时定下来
const double d = 1.3;

// Note: [] creates an empty list.
// const [] creates an empty, immutable list (EIL).
var foo = const []; // foo is currently an EIL.
final bar = const []; // bar will always be an EIL.
const baz = const []; // baz is a compile-time constant EIL.

// Symbols
// #radix
// #bar

// args library: https://pub.dartlang.org/packages/args
main(List<String> args) {
  switch (args[0]) {
    case '1':
      print(a1);
      printValue(233333);
      assert(a == 'hello',
          'value is "hello"'); // ?? --enable-asserts ?? --checked ??
      assert(false, 'It\'s 8888888888888');
      print(a);
      break;
    case 'testThrowException':
      try {
        testThrowException();
      } catch (e) {
        print('main() finished handling ${e.runtimeType}.');
      }
      break;
    case 'testRunes':
      testRunes();
      break;
    case 'testReverseString':
      testReverseString();
      break;
    case 'testOptionalParameters':
      testOptionalParameters();
      break;
    case 'testLexicalClosures':
      assert(testLexicalClosures() == null);  // All functions return a value. If no return value is specified, the statement return null; is implicitly appended to the function body.
      break;
    case 'testFunctionForEquality':
      testFunctionForEquality();
      break;
    case 'testOperators':
      testOperators();
      break;
    case 'testAny':
      testAny();
      break;
    case '':
      print();
      break;
    case '':
      print();
      break;
    case '':
      print();
      continue nowClosed;  // Continues executing at the nowClosed label.
    case '':
      print();
      break;
    nowClosed:
    case '':
      print();
      break;
    default:
  }
}
