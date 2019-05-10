const time = require('./time')
const fs = require('fs')

const objectEntries = require('../objectEntries')

const bigObject = {}
for (let i = 0; i < 5000000; i++) {
  bigObject[Math.random()] = i
}

const devnull = fs.createWriteStream('/dev/null')

time('iterating over objectEntries', () => {
  for (const entry of objectEntries(bigObject)) {
    devnull.write(entry.toString())
  }
})
