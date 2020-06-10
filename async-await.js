const promiseData = Promise.resolve('result') // 定义一个promise

const  test1 = async () => {
  	const num = await 6
    const result = await promiseData
    return result
}

const  test2 = async () => {
  	const result = await promiseData
    const num = await 6
    return num
}

test1().then(val => console.log(val)) // result
test2().then(val => console.log(val)) // 6

// 对应上边两个async函数
function * geneTest1() {
    const num = yield 6
    const data = yield promiseData
}

function * geneTest2() {
    const data = yield promiseData
    const num = yield 6
}

// 实现一个asyncToGenerator,经过asyncToGenerator包装过的generator，就跟async函数一样
// 版本一
const asyncToGenerator = (generatorFunc) => {
    return function(...args) {
        const gen = generatorFunc.call(this, ...args)
        let preValue
        const next = (result) => {
            const { done, value } = result
            if(!done) {
                preValue = value
                return Promise.resolve(value).then(
                    val => next(gen.next(val)),
                    err => next(gen.throw(err))
                )
            } else {
                return Promise.resolve(preValue)
            }
        }

        return next(gen.next())
    }
}

// 版本二
const asyncToGenerator2 = (generatorFunc) => {
    return function(...args) {
        const gen = generatorFunc.call(this, ...args)
        let preValue

        return new Promise((resolve, reject) => {
            let preValue
            const step = (key, val) => {
                let result
                
                try {
                    result = gen[key](val)
                } catch (error) {
                    reject(error)
                }
                const { value, done } = result
                
                if (done) {
                    resolve(preValue)
                } else {
                    preValue = value
                    return Promise.resolve(value)
                    .then(
                        val => step('next', val),
                        err => step('throw', err)
                    )
                }
            }
            return step('next')
        })
    }
     
}