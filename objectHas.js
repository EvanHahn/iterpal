module.exports = function objectHas (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
