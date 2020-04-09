import time from './time.js'

import map from '../map.js'
import filter from '../filter.js'

const bigArray = Array(5000000).fill(null).map(Math.random)

function noop () {}

time('using iterpal map and filter', () => {
  const result = map(
    filter(
      map(bigArray, n => n - 0.5),
      n => n > 0
    ),
    String
  )
  for (const value of result) {
    noop(value)
  }
})
