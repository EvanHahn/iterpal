const map = require('./map')

module.exports = function jsonStringify (value) {
  return JSON.stringify(wrap(value))
}

class MapWrapper {
  constructor (map) {
    this._map = map
  }
  toJSON () {
    const wrappedEntries = map(this._map.entries(), ([key, value]) => (
      [key, wrap(value)]
    ))
    return Object.fromEntries(wrappedEntries)
  }
}

class IteratorWrapper {
  constructor (iterable) {
    this._iterable = iterable
  }
  toJSON () {
    return [...map(this._iterable, wrap)]
  }
}

function shouldPassThrough (value) {
  return (
    (typeof value !== 'object') ||
    (Boolean(value) && ('toJSON' in value))
  )
}

function wrap (value) {
  if (shouldPassThrough(value)) {
    return value
  } else if (value instanceof Map) {
    return new MapWrapper(value)
  } else if (Symbol.iterator in value) {
    return new IteratorWrapper(value)
  } else {
    return value
  }
}
