function has (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

module.exports = function objectEntries (obj) {
  return {
    [Symbol.iterator]: function * () {
      for (const key in obj) {
        if (has(obj, key)) {
          yield [key, obj[key]]
        }
      }
    }
  }
}
