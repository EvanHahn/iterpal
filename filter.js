module.exports = function filter (iterable, fn) {
  return new FilterIterable(iterable, fn)
}

class FilterIterable {
  constructor (iterable, fn) {
    Object.defineProperties(this, {
      _iterable: { value: iterable },
      _fn: { value: fn }
    })
  }

  [Symbol.iterator] () {
    const iterator = this._iterable[Symbol.iterator]()
    const fn = this._fn

    return {
      next () {
        while (true) {
          const nextIteration = iterator.next()
          if (nextIteration.done || fn(nextIteration.value)) {
            return nextIteration
          }
        }
      }
    }
  }
}
