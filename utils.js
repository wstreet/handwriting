
 export const getType = value => {
    const objectType = Object.prototype.toString.call(value);
  
    const type = objectType.match(/^\[object (.*)\]$/)[1];
  
    return type.toLowerCase()
  }
  
export const isFuntion = value => {
  return getType(value) === 'function'
} 