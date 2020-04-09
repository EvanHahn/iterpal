import time from './time.js'

import map from '../map.js'

const bigArray = Array(5000000).fill(null).map(Math.random)

time('starting to read the first element from an iterpal-mapped array', () => {
  for (const value of map(bigArray, String)) {
    return value
  }
})
