module.exports = function filter (iterable, fn) {
  return {
    [Symbol.iterator]: function * () {
      for (const value of iterable) {
        if (fn(value)) {
          yield value
        }
      }
    }
  }
}
