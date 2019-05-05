module.exports = function concat (...iterables) {
  return {
    [Symbol.iterator]: function * () {
      for (const iterable of iterables) {
        for (const value of iterable) {
          yield value
        }
      }
    }
  }
}
