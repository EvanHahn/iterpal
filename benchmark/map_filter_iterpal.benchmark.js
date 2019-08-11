const time = require('./time')

const map = require('../map')
const filter = require('../filter')

const bigArray = Array(5000000).fill(null).map(Math.random)

function noop () {}

time('using iterpal map and filter', () => {
  const result = map(
    filter(
      map(bigArray, n => n - 0.5),
      n => n > 0
    ),
    String
  )
  for (const value of result) {
    noop(value)
  }
})
