const time = require('./time')
const fs = require('fs')

const map = require('../map')

const bigArray = Array(5000000).fill(null).map(Math.random)
const devnull = fs.createWriteStream('/dev/null')

time('converting an array of numbers to strings with iterpal map', () => {
  for (const value of map(bigArray, String)) {
    devnull.write(value)
  }
})
