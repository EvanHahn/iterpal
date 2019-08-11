const time = require('./time')

const map = require('../map')

const bigArray = Array(5000000).fill(null).map(Math.random)

function noop () {}

time('converting an array of numbers to strings with iterpal map', () => {
  for (const value of map(bigArray, String)) {
    noop(value)
  }
})
