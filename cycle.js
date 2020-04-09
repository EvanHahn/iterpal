export default function (iterable) {
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
    let iterator = iterable[Symbol.iterator]()

    return {
      next () {
        let nextIteration = iterator.next()

        if (nextIteration.done) {
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
