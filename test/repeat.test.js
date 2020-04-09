import test from 'ava'

import repeat from '../repeat.js'

test('returns an infinite iterable if passed just one argument', t => {
  const objForReferenceCheck = {}
  const iterator = repeat(objForReferenceCheck)[Symbol.iterator]()

  for (let i = 0; i < 100; i++) {
    t.deepEqual(iterator.next(), { value: objForReferenceCheck, done: false })
  }
})

test('returns a bounded iterable if passed two arguments', t => {
  t.deepEqual([...repeat('foo', 0)], [])
  t.deepEqual([...repeat('foo', 1)], ['foo'])

  const objForReferenceCheck = {}
  const resultArr = [...repeat(objForReferenceCheck, 10)]
  t.is(resultArr.length, 10)
  t.assert(resultArr.every(value => value === objForReferenceCheck))
})
