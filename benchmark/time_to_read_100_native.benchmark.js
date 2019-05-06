const time = require('./time')
const fs = require('fs')

const bigArray = Array(5000000).fill(null).map(Math.random)

const devnull = fs.createWriteStream('/dev/null')

time('starting to read the first element from a natively-mapped array', () => {
  let count = 0
  for (const value of bigArray.map(String)) {
    devnull.write(value)
    count++
    if (count === 100) {
      return
    }
  }
})