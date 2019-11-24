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


Function.prototype.myAplly = function () {
  // 判断拥有myAplly的方法是不是函数
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
 *      因为newnew绑定优先级高于显示绑定和硬绑定，    
 *       new > 显示绑定 > 隐式绑定 > 默认绑定
 * 
 */

// TODO
Function.prototype.myBind = function () {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function')

  }
  const args = [...arguments]
  const thisArg = args.shift()

  return function (...args) {

  }
}