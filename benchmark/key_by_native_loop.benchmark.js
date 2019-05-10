const time = require('./time')

const bigArray = Array(1000000).fill(null).map(() => ({
  a: Math.random(),
  b: Math.random(),
}))

time('native loop key by', () => {
  const result = {};
  for (const obj of bigArray) {
    result[obj.a] = obj
  }
  return result
})