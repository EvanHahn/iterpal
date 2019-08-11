const time = require('./time')

const bigObject = {}
for (let i = 0; i < 5000000; i++) {
  bigObject[Math.random()] = i
}

function noop () {}

time('native size with Object.keys', () => {
  noop(Object.keys(bigObject).length.toString())
})
