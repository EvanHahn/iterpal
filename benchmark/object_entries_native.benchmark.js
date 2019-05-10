const time = require('./time')
const fs = require('fs')

const bigObject = {}
for (let i = 0; i < 5000000; i++) {
  bigObject[Math.random()] = i
}

const devnull = fs.createWriteStream('/dev/null')

time('iterating over Object.entries', () => {
  for (const entry of Object.entries(bigObject)) {
    devnull.write(entry.toString())
  }
})
