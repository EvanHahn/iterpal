const time = require('./time')
const fs = require('fs')

const bigArray = Array(5000000).fill(null).map(Math.random)
const devnull = fs.createWriteStream('/dev/null')

time('converting an array of numbers to strings with Array.prototype.map', () => {
  for (const value of bigArray.map(String)) {
    devnull.write(value)
  }
})
