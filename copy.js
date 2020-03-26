const getType = value => {
    const objectType = Object.prototype.toString.call(value);

    const type = objectType.match(/^\[object (.*)\]$/)[1];

    return type.toLowerCase()
}


// 浅拷贝
const obj = {
    a: 1,
    b: 2
}
const shallowCopy = value => {
    // copy 动作
}

const copyObj = shallowCopy(obj) // { a: 1, b: 2 }


const obj1 = {
    a: 1,
    b: {
        c: 2,
        d: [1, 2, 3]
    }
}

const deepCopy  = value => {
    let copyValue = value
    const type = getType(value)
    if (type === 'object') {
        copyValue = {}
        for (const key in value) {
            copyValue[key] = deepCopy(value[key])
        }
    }

    if (type === 'array') {
        copyValue = value.map(i => deepCopy(i))
    }

    return copyValue
}