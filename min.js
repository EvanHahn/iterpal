module.exports = function min (numbers) {
  let result
  for (const number of numbers) {
    if ((result === undefined) || (result > number)) {
      result = number
    }
  }
  return result
}
