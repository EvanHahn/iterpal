module.exports = function fibonacci () {
  return {
    [Symbol.iterator]: function * () {
      yield 1
      yield 1

      let twoAgo = 1
      let oneAgo = 1
      while (true) {
        const next = oneAgo + twoAgo
        yield next
        twoAgo = oneAgo
        oneAgo = next
      }
    }
  }
}
