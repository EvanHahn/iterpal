import test from 'ava'

import LazySet from '../LazySet'

test('`has` returns true for elements in the collection and false otherwise', t => {
  const set = new LazySet([1, 2, 3, 2])

  t.true(set.has(1))
  t.true(set.has(2))
  t.true(set.has(3))

  t.false(set.has(0))
  t.false(set.has(4))
  t.false(set.has('1'))
})

test('`has` only "realizes" the iterable as needed', t => {
  let callCount = 0
  const customIterable = {
    * [Symbol.iterator] () {
      callCount++
      yield 'a'
      callCount++
      yield 'b'
      callCount++
      yield 'c'
      callCount++
      yield 'd'
      callCount++
      yield 'a'
    }
  }

  const set = new LazySet(customIterable)
  t.is(callCount, 0)

  t.true(set.has('b'))
  t.is(callCount, 2)

  t.true(set.has('b'))
  t.true(set.has('a'))
  t.is(callCount, 2)

  t.false(set.has('x'))
  t.is(callCount, 5)
})

test('it is iterable', t => {
  const set = new LazySet([1, 2, 3, 2])
  t.deepEqual([...set], [1, 2, 3])
})
