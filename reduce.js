const arr = [1 ,2, 3, 4]

const resuslt = arr.reduce((acc, cur, idx) => {
    return acc + cur
})

// reduce两个参数
// 1、fn，接受四个参数，acc（累加器），cur(当前item)，idx（当前索引值），source（源数组）
// 2、initValue，可选，acc初始赋值
//   --initValue存在时赋值给acc，如果不存在，acc取数据第一项，cur取数组第二项

Array.prototype.myReduce = function (reducer, initValue) {
    let acc = initValue
    let index = 0
    if (!initValue) {
        acc = this[index]
        index = 1
    }

    for (; index < this.length; index++) {
        acc = reducer(acc, this[index], index, this)
    }
    return acc
}

// reduceRight和reduce功能一样，只是累计顺序不一样，reduceRight是从数组末尾开始
// 实现reduceRight只需要再循环的时候从数组末尾开始取就行

Array.prototype.myReduceRight = function (reducer, initValue) {
    let acc = initValue
    let index = this.length - 1
    if (!initValue) {
        acc = this[index]
        index = index - 1
    }

    for (; index >= 0; index--) {
        acc = reducer(acc, this[index], index, this)
    }
    return acc
}