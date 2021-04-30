import test from "ava";

import objectKeys from "../objectKeys.js";

test("returns an iterable of keys", (t) => {
  function Klass(prop) {
    this.prop = prop;
    Object.defineProperty(this, "notEnumerable", {
      value: 123,
      enumerable: false,
    });
  }
  Klass.prototype.shouldBeIgnored = true;

  t.deepEqual([...objectKeys({})], []);
  t.deepEqual([...objectKeys({ foo: "bar" })], ["foo"]);
  t.deepEqual(
    [
      ...objectKeys({
        foo: "bar",
        baz: "qux",
      }),
    ],
    ["foo", "baz"]
  );
  t.deepEqual([...objectKeys(new Klass(123))], ["prop"]);
});
