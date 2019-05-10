const objectHas = require('./objectHas')

module.exports = function objectValues (obj) {
  return new ObjectValuesIterable(obj)
}

class ObjectValuesIterable {
  constructor (obj) {
    Object.defineProperty(this, '_obj', { value: obj })
  }
  * [Symbol.iterator] () {
    const obj = this._obj

    for (const key in obj) {
      if (objectHas(obj, key)) {
        yield obj[key]
      }
    }
  }
}
