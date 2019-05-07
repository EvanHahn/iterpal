module.exports = function range (start = 0, finish = Infinity) {
  return {
    [Symbol.iterator]: function * () {
      for (let i = start; i < finish; i++) {
        yield i
      }
    }
  }
}
