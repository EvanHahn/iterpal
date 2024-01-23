import { assertEquals } from "assert";

import quickSize from "../quickSize.js";

Deno.test("returns the size of common iterables", () => {
  assertEquals(quickSize([]), 0);
  assertEquals(quickSize([9, 8, 7]), 3);

  assertEquals(quickSize(""), 0);
  assertEquals(quickSize("foo"), 3);

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
    assertEquals(quickSize(new Arraylike()), 0);
    assertEquals(quickSize(new Arraylike([9, 8, 7])), 3);
  }

  assertEquals(quickSize(new BigInt64Array()), 0);
  assertEquals(quickSize(new BigInt64Array([9n, 8n, 7n])), 3);
  assertEquals(quickSize(new BigUint64Array()), 0);
  assertEquals(quickSize(new BigUint64Array([9n, 8n, 7n])), 3);

  assertEquals(quickSize(new Map()), 0);
  assertEquals(
    quickSize(
      new Map([
        ["foo", 1],
        ["bar", 2],
      ]),
    ),
    2,
  );

  assertEquals(quickSize(new ArrayBuffer()), 0);
  assertEquals(quickSize(new ArrayBuffer(3)), 3);
});

Deno.test('returns null if the iterable is not "common"', () => {
  const customIterable = {
    length: 3,
    *[Symbol.iterator]() {
      yield "foo";
      yield "bar";
      yield "baz";
    },
  };

  assertEquals(quickSize(customIterable), null);
});
