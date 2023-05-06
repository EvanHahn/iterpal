import test from "ava";

import quickSize from "../quickSize.js";

test("returns the size of common iterables", (t) => {
  t.is(quickSize([]), 0);
  t.is(quickSize([9, 8, 7]), 3);

  t.is(quickSize(""), 0);
  t.is(quickSize("foo"), 3);

  const arraylikes = [
    Set,
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
  ];
  for (const Arraylike of arraylikes) {
    t.is(quickSize(new Arraylike()), 0);
    t.is(quickSize(new Arraylike([9, 8, 7])), 3);
  }

  t.is(quickSize(new BigInt64Array()), 0);
  t.is(quickSize(new BigInt64Array([9n, 8n, 7n])), 3);
  t.is(quickSize(new BigUint64Array()), 0);
  t.is(quickSize(new BigUint64Array([9n, 8n, 7n])), 3);

  t.is(quickSize(new Map()), 0);
  t.is(
    quickSize(
      new Map([
        ["foo", 1],
        ["bar", 2],
      ])
    ),
    2
  );

  t.is(quickSize(new ArrayBuffer()), 0);
  t.is(quickSize(new ArrayBuffer(3)), 3);
});

test('returns null if the iterable is not "common"', (t) => {
  const customIterable = {
    length: 3,
    *[Symbol.iterator]() {
      yield "foo";
      yield "bar";
      yield "baz";
    },
  };

  t.is(quickSize(customIterable), null);
});
