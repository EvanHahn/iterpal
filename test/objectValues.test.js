import test from "ava";

import objectValues from "../objectValues.js";

test("returns an iterable of values", (t) => {
  function Klass(prop) {
    this.prop = prop;
    Object.defineProperty(this, "notEnumerable", {
      value: 123,
      enumerable: false,
    });
  }
  Klass.prototype.shouldBeIgnored = true;

  t.deepEqual([...objectValues({})], []);
  t.deepEqual([...objectValues({ foo: "bar" })], ["bar"]);
  t.deepEqual(
    [
      ...objectValues({
        foo: "bar",
        baz: "qux",
      }),
    ],
    ["bar", "qux"]
  );
  t.deepEqual([...objectValues(new Klass(123))], [123]);
});
