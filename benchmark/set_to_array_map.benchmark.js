import time from './time.js'

const bigSet = new Set()
for (let i = 0; i < 1000000; i++) {
  bigSet.add(Math.random())
}

function noop () {}

time('converting a Set to Array, then mapping over it with Array.prototype.map', () => {
  for (const value of [...bigSet].map(String)) {
    noop(value)
  }
})
