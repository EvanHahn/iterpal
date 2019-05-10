module.exports = function take (iterable, amount) {
  return {
    [Symbol.iterator]: () => {
      const iterator = iterable[Symbol.iterator]()
      return {
        next () {
          const nextIteration = iterator.next()
          if (nextIteration.done || amount === 0) {
            return { done: true }
          } else {
            amount--
            return nextIteration
          }
        }
      }
    }
  }
}
