module.exports = function filter (iterable, fn) {
  const iterator = iterable[Symbol.iterator]()

  return Object.create(null, {
    [Symbol.iterator]: {
      value: function () {
        return Object.create(null, {
          next: {
            value: function () {
              while (true) {
                const nextIteration = iterator.next()
                if (nextIteration.done || fn(nextIteration.value)) {
                  return nextIteration
                }
              }
            }
          }
        })
      }
    }
  })
}
