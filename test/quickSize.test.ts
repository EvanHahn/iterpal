import { assertEquals } from "assert";

import quickSize from "../quickSize.ts";

Deno.test("returns the size of common iterables", () => {
  assertEquals(quickSize([]), 0);
  assertEquals(quickSize([9, 8, 7]), 3);

  assertEquals(quickSize(""), 0);
  assertEquals(quickSize("foo"), 3);

  assertEquals(quickSize(new Set()), 0);
  assertEquals(quickSize(new Set([9, 8, 7, 9, 9, 9])), 3);

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

  const numberTypedArrays = [
    Uint8Array,
    Uint8ClampedArray,
    Uint16Array,
    Uint32Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Float32Array,
    Float64Array,
  ];
  for (const Arraylike of numberTypedArrays) {
    assertEquals(quickSize(new Arraylike()), 0);
    assertEquals(quickSize(new Arraylike([9, 8, 7])), 3);
  }
  assertEquals(quickSize(new BigInt64Array()), 0);
  assertEquals(quickSize(new BigInt64Array([9n, 8n, 7n])), 3);
  assertEquals(quickSize(new BigUint64Array()), 0);
  assertEquals(quickSize(new BigUint64Array([9n, 8n, 7n])), 3);
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

  assertEquals(quickSize({ length: 123 }), null);
  assertEquals(quickSize({ size: 123 }), null);
  assertEquals(quickSize(new ArrayBuffer(3)), null);
  assertEquals(quickSize(customIterable), null);
});
