module.exports = function drop (iterable, amount) {
  return new DropIterable(iterable, amount)
}

class DropIterable {
  constructor (iterable, amount) {
    Object.defineProperties(this, {
      _iterable: { value: iterable },
      _amount: { value: amount }
    })
  }
  [Symbol.iterator] () {
    const iterator = this._iterable[Symbol.iterator]()
    const amount = this._amount

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
