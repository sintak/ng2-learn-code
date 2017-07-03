const Serializable = Sup => class extends Sup {
  constructor(...args){
    super(...args);
    if(typeof this.constructor.stringify !== "function"){
      throw new ReferenceError("Please define stringify method to the Class!");
    }
    if(typeof this.constructor.parse !== "function"){
      throw new ReferenceError("Please define parse method to the Class!");
    }
    if(typeof this.instance !== "function"){
      throw new ReferenceError("Please define instance method to the Class!");
    }
  }
  toString(){
    return this.constructor.stringify(this);
  }
}

class Person {
  constructor(name, age, gender){
    Object.assign(this, {name, age, gender});
  }
}

class Employee extends Serializable(Person){
  constructor(name, age, gender, level, salary){
    super(name, age, gender);
    this.level = level;
    this.salary = salary;
  }
  static stringify(employee){
    let {name, age, gender, level, salary} = employee;
    return JSON.stringify({name, age, gender, level, salary});
  }
  static parse(str){  // constructor的方法(类方法)要用static方式复写，否则报错。调用也是通过 ClassName.MethodName 方式调用。static类方法不会被继承
    let {name, age, gender, level, salary} = JSON.parse(str);
    return new Employee(name, age, gender, level, salary);
  }
  instance(){}  // this方法(实例方法)

/**
 * 结构：
  Object {}
    constructor : function (Person)
        parse : function (str)
        stringify : function (employee)
    instance : ()
    __proto__ : Person
 */
}

let employee = new Employee("jane",25,"f",1,1000);
let employee2 = Employee.parse(employee+""); //通过序列化反序列化复制对象

console.log(employee2, 
  employee2 instanceof Employee,  //true 
  employee2 instanceof Person,  //true
  employee == employee2);   //false


let person = new Person("john", 22, "m"); //Person {name: "john", age: 22, gender: "m"}