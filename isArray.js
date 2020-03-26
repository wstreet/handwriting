Array.isMyArray = function(value) {
    const objectType = Object.prototype.toString.call(value);

    const type = objectType.match(/^\[object (.*)\]$/)[1];

    return type === 'Array';
}


// 扩展
const getType = value => {
    const objectType = Object.prototype.toString.call(value);

    const type = objectType.match(/^\[object (.*)\]$/)[1];

    return type.toLowerCase()
}