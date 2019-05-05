module.exports = function map (iterable, fn) {
  return {
    [Symbol.iterator]: function * () {
      for (const value of iterable) {
        yield fn(value)
      }
    }
  }
}
