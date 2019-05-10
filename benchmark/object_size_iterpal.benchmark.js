const time = require('./time')
const fs = require('fs')

const size = require('../size')
const objectKeys = require('../objectKeys')

const bigObject = {}
for (let i = 0; i < 5000000; i++) {
  bigObject[Math.random()] = i
}

const devnull = fs.createWriteStream('/dev/null')

time('iterpal object size', () => {
  devnull.write(size(objectKeys(bigObject)).toString())
})
