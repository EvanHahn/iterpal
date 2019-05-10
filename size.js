module.exports = function size (iterable) {
  // These are for performance.
  if (Array.isArray(iterable) || (typeof iterable === 'string')) {
    return iterable.length
  } else if ((iterable instanceof Set) || (iterable instanceof Map)) {
    return iterable.size
  }

  const iterator = iterable[Symbol.iterator]()
  let result = -1
  for (let isDone = false; !isDone; result++) {
    isDone = iterator.next().done
  }
  return result
}
