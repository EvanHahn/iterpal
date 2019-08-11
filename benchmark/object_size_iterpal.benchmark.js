const time = require('./time')

const size = require('../size')
const objectKeys = require('../objectKeys')

const bigObject = {}
for (let i = 0; i < 5000000; i++) {
  bigObject[Math.random()] = i
}

function noop () {}

time('iterpal object size', () => {
  noop(size(objectKeys(bigObject)).toString())
})
