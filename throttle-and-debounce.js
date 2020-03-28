// throttle
// 闭包加时间差
function throttle (fn, delay) {
    let preTime = Date.now()
    return function (...args) {
        const curTime = Date.now();

        if (curTime - preTime > delay) {
            fn(this, ...args);

            preTime = curTime
        }
    }
}


// debounce
function debounce(fn, delay) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(this, ...args)
    }, delay)
  }
}