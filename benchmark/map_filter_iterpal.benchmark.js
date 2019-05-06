const time = require('./time')
const fs = require('fs')

const map = require('../map')
const filter = require('../filter')

const bigArray = Array(5000000).fill(null).map(Math.random)
const devnull = fs.createWriteStream('/dev/null')

time('using iterpal map and filter', () => {
  const result = map(
    filter(
      map(bigArray, n => n - 0.5),
      n => n > 0
    ),
    String
  )
  for (const value of result) {
    devnull.write(value)
  }
})
