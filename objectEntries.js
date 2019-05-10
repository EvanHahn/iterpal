const objectHas = require('./objectHas')

module.exports = function objectEntries (obj) {
  return new ObjectEntriesIterable(obj)
}

class ObjectEntriesIterable {
  constructor (obj) {
    Object.defineProperty(this, '_obj', { value: obj })
  }
  * [Symbol.iterator] () {
    const obj = this._obj

    for (const key in obj) {
      if (objectHas(obj, key)) {
        yield [key, obj[key]]
      }
    }
  }
}
