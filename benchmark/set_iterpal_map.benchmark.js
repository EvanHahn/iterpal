const time = require('./time')
const fs = require('fs')

const map = require('../map')

const bigSet = new Set()
for (let i = 0; i < 5000000; i++) {
  bigSet.add(Math.random())
}

const devnull = fs.createWriteStream('/dev/null')

time('mapping over a Set using iterpal map', () => {
  for (const value of map(bigSet, String)) {
    devnull.write(value)
  }
})
