const time = require('./time')

const bigArray = Array(5000000).fill(null).map(Math.random)

time('starting to read the first element from a natively-mapped array', () => {
  for (const value of bigArray.map(String)) {
    return value
  }
})
