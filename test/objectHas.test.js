import { assert, assertFalse } from "assert";

import objectHas from "../objectHas.js";

Deno.test("returns true for own properties, false otherwise", () => {
  const mySymbol = Symbol("hello");

  class Klass {
    constructor(prop1, prop2) {
      this.ownProp1 = prop1;
      this[mySymbol] = prop2;
    }

    prop3() {
      return true;
    }
  }

  const obj = new Klass("foo", "boo");

  assert(objectHas(obj, "ownProp1"));
  assert(objectHas(obj, mySymbol));
  assertFalse(objectHas(obj, "prop3"));
  assertFalse(objectHas(obj, "prop4"));
  assertFalse(objectHas(obj, Symbol("another")));
});
