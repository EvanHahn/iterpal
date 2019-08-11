const time = require('./time')

const objectEntries = require('../objectEntries')

const bigObject = {}
for (let i = 0; i < 1000000; i++) {
  bigObject[Math.random()] = i
}

function noop () {}

time('iterating over objectEntries', () => {
  for (const entry of objectEntries(bigObject)) {
    noop(entry.toString())
  }
})
