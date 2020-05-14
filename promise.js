
import {isFuntion} from './utils'

// export
//  const getType = value => {
//   const objectType = Object.prototype.toString.call(value);

//   const type = objectType.match(/^\[object (.*)\]$/)[1];

//   return type.toLowerCase()
// }

// export 
// const isFuntion = value => {
//   return getType(value) === 'function'
// } 

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'



class MyPromise {
  constructor(handler) {
    this.state = PENDING
    this.value = undefined
    this.callbacks = []

    try {
      handler(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  resolve = (value) => {
    if (this.state !== PENDING) return

    this.state = FULFILLED
    this.value = value

    this.excuteCallBacks()
  }

  reject = (reason) => {
    if (this.state !== PENDING) return

    this.state = REJECTED
    this.value = reason

    this.excuteCallBacks()

  }


  handleCallback = (callback) => {
    const { onFulfilled, onRejected, resolve, reject } = callback
    if (this.state === FULFILLED) {
      isFuntion(onFulfilled) ? resolve(onFulfilled(this.value)) : resolve(this.value)
    }
    if (this.state === REJECTED) {
      isFuntion(onRejected) ? reject(onRejected(this.value)) : reject(this.value)
    }
  }

  excuteCallBacks = () => {
    this.callbacks.forEach(callback => {
      setTimeout(() => {
        this.handleCallback(callback)
      }, 0)
    })
  }


  then = (onFulfilled, onRejected) => {
    return new MyPromise((resolve, reject) => {
      const callback = { onFulfilled, onRejected, resolve, reject }
      if (this.state === PENDING) {
        this.callbacks.push(callback)
      } else {
        setTimeout(() => {
          this.handleCallback(callback)
        }, 0)
      }
    })
  }

  // TODO
  catch = (onRejected) => {
    const onFulfilled = () => {}
    return new MyPromise((resolve, reject) => {
      const callback = { onFulfilled, onRejected, resolve, reject }
      if (this.state === PENDING) {
        this.callbacks.push(callback)
      } else {
        setTimeout(() => {
          this.handleCallback(callback)
        }, 0)
      }
    })
  }

  finally = (callback) => {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    )
  }

  static resolve = (value) => {
    return new MyPromise((resolve, reject) => resolve(value))
  }

  static reject = (reason) => {
    return new MyPromise((resolve, reject) => reject(reason))
  }

  // 所有结果fulfilled
  static all = () => {

  }

  // 取先fulfilled的结果
  static race = () => {

  }

  // 任意一个变成fulfilled，结果是fulfilled
  static any = () => {

  }

}



