/**
 * call实现
 * 实现原理：方法内部的this一般在调用时确定，将fn赋值给thisArg的一个方法，
 * 然后执行，之后再将thisArg上的fn删除，最后返回结果
 * apply与此相似
 */
// fn.call(thisArg, 其他参数)

Function.prototype.myCall = function () {
  // 判断拥有myCall的方法是不是函数
  if (typeof this !== 'function') {
    throw new TypeError(`${this} is not a function`)
  }

  const args = [...arguments]
  const thisArg = args.shift() || window

  // 方法内部的this指向在方法调用时确定，指向方法所属的对象thisArg
  thisArg.fn = this
  const result = thisArg.fn(...args)

  // 删除fn
  delete thisArg.fn

  return result
}



/**
 * aplly实现
 */


Function.prototype.myApply = function () {
  // 判断拥有myApply的方法是不是函数
  if (typeof this !== 'function') {
    throw new TypeError(`${this} is not a function`)

  }

  const args = [...arguments]
  const thisArg = args.shift() || window

  // 方法内部的this指向在方法调用时确定，指向方法所属的对象thisArg
  thisArg.fn = this
  const result = thisArg.fn(...args[0])

  // 删除fn
  delete thisArg.fn

  return result
}



/**
 * bind实现
 * 注意：bind最终返回一个函数，作为构造函数使用new调用时，不应该改变this指向，
 *      因为new绑定优先级高于显示绑定和硬绑定，    
 *       new > 显示绑定 > 隐式绑定 > 默认绑定
 * 
 * 实现原理：bind实现依赖于call或者apply，绑定过程分三个步骤
 * 1、返回一个函数
 * 2、参数绑定
 * 3、使用new
 * 
 */

// 效果
function foo(x, y) {
  console.log(this)
  this.x = x
  this.y = y
}

const obj = {
  props: '007'
}


const bindFoo = foo.bind(obj, 'hello')

foo(1, 2) // window
bindFoo('world') // obj
new bindFoo('newWorld')

// 解释：
// a步骤：const bindFoo = foo.bind(obj)相当于指定foo内部的this为obj，并返回一个函数
// b步骤：new bindFoo()，因为new的优先级高于aplly，所以a步骤绑定的this失效，this现在指向new创建的实例





Function.prototype.myBind = function () {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function')

  }

  const args = [...arguments]
  const thisArg = args.shift()
  console.log('外层', args)
  const selfFn = this
  return function F(...innerArgs) {
    const concatArgs = [...args, ...arguments]
    console.log(this instanceof F)
    return this instanceof F
      ? new selfFn(...concatArgs)
      : selfFn.apply(thisArg, concatArgs)
  }
}

// 测试代码
function foo(x, y) {
  this.x = x
  this.y = y
}

const obj = {
  props: '007'
}


const bindFoo = foo.myBind(obj, 'hello')

foo(1, 2) // window
bindFoo('world') // obj
new bindFoo('newWorld')