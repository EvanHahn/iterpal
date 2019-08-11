module.exports = function (iterable) {
  return new CycleIterable(iterable)
}

class CycleIterable {
  constructor (iterable, fn) {
    Object.defineProperty(this, '_iterable', {
      value: iterable
    })
  }

  [Symbol.iterator] () {
    const iterable = this._iterable
    let iterator

    return {
      next () {
        let nextIteration

        if (iterator) {
          nextIteration = iterator.next()
          if (nextIteration.done) {
            iterator = iterable[Symbol.iterator]()
            nextIteration = iterator.next()
          }
        } else {
          iterator = iterable[Symbol.iterator]()
          nextIteration = iterator.next()
          if (nextIteration.done) {
            throw new Error('Cannot cycle an empty iterable')
          }
        }

        return nextIteration
      }
    }
  }
}
