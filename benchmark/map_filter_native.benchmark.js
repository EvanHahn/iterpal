import time from './time.js'

const bigArray = Array(5000000).fill(null).map(Math.random)

function noop () {}

time('using native map and filter', () => {
  const result = bigArray
    .map(n => n - 0.5)
    .filter(n => n > 0)
    .map(String)
  for (const value of result) {
    noop(value)
  }
})
