module.exports = function (iterable) {
  return iterable[Symbol.iterator]().next().value
}
