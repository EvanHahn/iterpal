const time = require('./time')

const map = require('../map')

const bigArray = Array(5000000).fill(null).map(Math.random)

function noop () {}

time('reading the first 100 elements from an iterpal-mapped array', () => {
  let count = 0
  for (const value of map(bigArray, String)) {
    noop(value)
    count++
    if (count === 100) {
      return
    }
  }
})
