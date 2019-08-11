const time = require('./time')

const bigObject = {}
for (let i = 0; i < 1000000; i++) {
  bigObject[Math.random()] = i
}

function noop () {}

time('iterating over Object.entries', () => {
  for (const entry of Object.entries(bigObject)) {
    noop(entry.toString())
  }
})
