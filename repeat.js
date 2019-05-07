module.exports = function repeat (value, times = Infinity) {
  return {
    [Symbol.iterator]: function * () {
      for (let i = 0; i < times; i++) {
        yield value
      }
    }
  }
}
