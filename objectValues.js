const objectHas = require('./objectHas')

module.exports = function objectKeys (obj) {
  return {
    [Symbol.iterator]: function * () {
      for (const key in obj) {
        if (objectHas(obj, key)) {
          yield obj[key]
        }
      }
    }
  }
}
