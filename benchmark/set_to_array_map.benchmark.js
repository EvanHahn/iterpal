const time = require('./time')
const fs = require('fs')

const bigSet = new Set()
for (let i = 0; i < 5000000; i++) {
  bigSet.add(Math.random())
}

const devnull = fs.createWriteStream('/dev/null')

time('converting a Set to Array, then mapping over it with Array.prototype.map', () => {
  for (const value of [...bigSet].map(String)) {
    devnull.write(value)
  }
})
