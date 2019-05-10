module.exports = function take (iterable, amount) {
  return new TakeIterator(iterable, amount)
}

class TakeIterator {
  constructor (iterable, amount) {
    Object.defineProperties(this, {
      _iterable: { value: iterable },
      _amount: { value: amount }
    })
  }
  [Symbol.iterator] () {
    const iterator = this._iterable[Symbol.iterator]()
    let amount = this._amount

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
