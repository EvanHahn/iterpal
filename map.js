module.exports = function map (iterable, fn) {
  const iterator = iterable[Symbol.iterator]()

  return Object.create(null, {
    [Symbol.iterator]: {
      value: function () {
        return Object.create(null, {
          next: {
            value: function () {
              const nextIteration = iterator.next()
              if (nextIteration.done) {
                return nextIteration
              } else {
                return {
                  done: false,
                  value: fn(nextIteration.value)
                }
              }
            }
          }
        })
      }
    }
  })
}
