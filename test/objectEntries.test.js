import test from 'ava'

import objectEntries from '../objectEntries'

test('returns an iterable of entries', t => {
  function Klass (prop) {
    this.prop = prop
    Object.defineProperty(this, 'notEnumerable', {
      value: 123,
      enumerable: false
    })
  }
  Klass.prototype.shouldBeIgnored = true

  t.deepEqual([...objectEntries({})], [])
  t.deepEqual([...objectEntries({ foo: 'bar' })], [['foo', 'bar']])
  t.deepEqual([...objectEntries({
    foo: 'bar',
    baz: 'qux'
  })], [
    ['foo', 'bar'],
    ['baz', 'qux']
  ])
  t.deepEqual([...objectEntries(new Klass(123))], [['prop', 123]])
})
