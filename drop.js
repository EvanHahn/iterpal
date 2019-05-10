module.exports = function drop (iterable, amount) {
  return {
    [Symbol.iterator]: () => {
      const iterator = iterable[Symbol.iterator]()
      let hasDropped = false
      return {
        next () {
          if (!hasDropped) {
            for (let i = 0; i < amount; i++) {
              iterator.next()
            }
            hasDropped = true
          }
          return iterator.next()
        }
      }
    }
  }
}
