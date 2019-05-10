import test from 'ava'

import jsonStringify from '../jsonStringify'

test('stringifies custom iterables like arrays', t => {
  const myIterable = {
    [Symbol.iterator]: function * () {
      yield 1
      yield 2
      yield 3
    }
  }
  t.is(jsonStringify(myIterable), '[1,2,3]')
})

test('stringifies Sets like arrays', t => {
  t.is(jsonStringify(new Set()), '[]')
  t.is(jsonStringify(new Set([1])), '[1]')
  t.is(jsonStringify(new Set([
    new Set(['hello']),
    new Set(['world'])
  ])), '[["hello"],["world"]]')
})

test('stringifies Maps like objects', t => {
  t.is(jsonStringify(new Map()), '{}')
  t.is(jsonStringify(new Map([['foo', 'boo']])), '{"foo":"boo"}')
  t.is(jsonStringify(new Map([
    ['outer', new Map([['inner', 'foo']])]
  ])), '{"outer":{"inner":"foo"}}')
})
