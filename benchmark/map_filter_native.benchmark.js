const time = require('./time')
const fs = require('fs')

const bigArray = Array(5000000).fill(null).map(Math.random)
const devnull = fs.createWriteStream('/dev/null')

time('using native map and filter', () => {
  const result = bigArray
    .map(n => n - 0.5)
    .filter(n => n > 0)
    .map(String)
  for (const value of result) {
    devnull.write(value)
  }
})
