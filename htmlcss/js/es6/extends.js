class Serializable{
  constructor(){
    if(typeof this.constructor.stringify !== "function"){
      throw new ReferenceError("Please define stringify method to the Class!");
    }
    if(typeof this.constructor.parse !== "function"){
      throw new ReferenceError("Please define parse method to the Class!");
    }
  }
  toString(){
    return this.constructor.stringify(this);
  }
}

class Person extends Serializable{
  constructor(name, age, gender){
    super();
    Object.assign(this, {name, age, gender});
  }
}

class Employee extends Person{
  constructor(name, age, gender, level, salary){
    super(name, age, gender);
    this.level = level;
    this.salary = salary;
  }
  static stringify(employee){
    let {name, age, gender, level, salary} = employee;
    return JSON.stringify({name, age, gender, level, salary});
  }
  static parse(str){
    let {name, age, gender, level, salary} = JSON.parse(str);
    return new Employee(name, age, gender, level, salary);
  }
}

let employee = new Employee("jane",25,"f",1,1000);
let employee2 = Employee.parse(employee+""); //通过序列化反序列化复制对象

console.log(employee2, 
  employee2 instanceof Employee,  //true 
  employee2 instanceof Person,  //true
  employee == employee2);   //false

// let person = new Person("john", 22, "m");//Uncaught ReferenceError: Please define stringify method to the Class!