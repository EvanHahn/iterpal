import test from 'ava'

import objectHas from '../objectHas.js'

test('returns true for own properties, false otherwise', t => {
  const mySymbol = Symbol('hello')

  function Klass (prop1, prop2) {
    this.ownProp1 = prop1
    this[mySymbol] = prop2
  }
  Klass.prototype.prop3 = true

  const obj = new Klass('foo', 'boo')

  t.true(objectHas(obj, 'ownProp1'))
  t.true(objectHas(obj, mySymbol))
  t.false(objectHas(obj, 'prop3'))
  t.false(objectHas(obj, 'prop4'))
  t.false(objectHas(obj, Symbol('another')))
})
