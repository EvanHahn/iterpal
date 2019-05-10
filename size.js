module.exports = function size (iterable) {
  // These are for performance, saving us from having to go through
  // the whole iterable for some common cases.
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
