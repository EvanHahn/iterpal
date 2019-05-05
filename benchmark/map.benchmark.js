const time = require('./time')
const fs = require('fs')

const map = require('../map')

const bigArray = Array(1000000).fill(null).map(Math.random)
const bigSet = new Set(bigArray)
const devnull = fs.createWriteStream('/dev/null')

time('converting an array of numbers to strings with Array.prototype.map', () => {
  for (const value of bigArray.map(String)) {
    devnull.write(value)
  }
})

time('converting an array of numbers to strings with iterpal map', () => {
  for (const value of map(bigArray, String)) {
    devnull.write(value)
  }
})

time('converting a Set to Array, then mapping over it with Array.prototype.map', () => {
  for (const value of [...bigSet].map(String)) {
    devnull.write(value)
  }
})

time('mapping over a Set using iterpal map', () => {
  for (const value of map(bigSet, String)) {
    devnull.write(value)
  }
})
