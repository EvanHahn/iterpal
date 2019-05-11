const time = require('./time')

const map = require('../map')

const bigArray = Array(1000000).fill(null).map(() => ({
  a: Math.random(),
  b: Math.random()
}))

time('iterpal reduce key by', () => {
  return Object.fromEntries(map(bigArray, obj => [obj.a, obj]))
})
