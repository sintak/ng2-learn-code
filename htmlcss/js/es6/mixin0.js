// Function.prototype.getName = function(){
//     return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
// }

var calculatorMixin = Base => class extends Base {
  calc() { console.log('calc', this); }
};

var randomizerMixin = Base => class extends Base {
  randomize() { console.log('randomize', this); }
};

class Foo { f(){console.log('f', this); } }
class Bar extends calculatorMixin(randomizerMixin(Foo)) { }

var bar = new Bar();
bar.calc();
bar.randomize();
bar.f();