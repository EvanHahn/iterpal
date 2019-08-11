class LazySet {
  constructor (iterable = []) {
    const iterator = iterable[Symbol.iterator]()
    Object.defineProperties(this, {
      _iterator: {value: iterator},
      _realSet: {value: new Set()}
    })
  }

  has (value) {
    const realSet = this._realSet
    if (realSet.has(value)) {
      return true
    }

    const iterator = this._iterator
    for (let iteration = iterator.next(); !iteration.done; iteration = iterator.next()) {
      realSet.add(iteration.value)
      if (iteration.value === value) {
        return true
      }
    }

    return false
  }

  [Symbol.iterator] () {
    this._realize()
    return this._realSet[Symbol.iterator]()
  }

  size () {
    this._realize()
    return this._realSet.size
  }

  _realize () {
    const iterator = this._iterator
    const realSet = this._realSet
    for (let iteration = iterator.next(); !iteration.done; iteration = iterator.next()) {
      realSet.add(iteration.value)
    }
  }
}

module.exports = LazySet
