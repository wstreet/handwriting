// ES6继承

class Animal {
  static footer = 'footer'

  constructor(opt) {
    this.name = opt.name
  }

  getName() {
    return this.name
  }

}

class Cat extends Animal {
  constructor(opt) {
    super(opt)

    this.age = opt.age
  }

  getAge() {
    return this.age
  }
}

const cat = new Cat({ name: 'miao', age: 5 })


// 模拟实现

function inherit(Sub, Sup) {
  // Object.create和原型式继承一样，返回一个参数对象的副本
  // 寄生式继承+原型链继承
  const prototype = Object.create(Sup.prototype)

  Sub.prototype = prototype   // 改变子类构造函数的prototype
  Sub.prototype.constructor = Sub

  Sub.__proto__ = Sup
}

function SupType(name) {
  this.name = name
  this.colors = ['red']
}

SupType.prototype.getName = function () {
  return this.name
};

function SubType(name, age) {
  this.age = age
  // 构造函数继承
  SupType.call(this, name)
}

inherit(SubType, SupType)
SubType.prototype.getAge = function () {
  return this.age
}

const sub = new SubType('streetex', 25)