import { assert, assertEquals } from "assert";

import { asyncify, emptyAsyncIterable, hasSameValues } from "../mod.ts";

const nineEightSeven = {
  *[Symbol.iterator]() {
    yield 9;
    yield 7;
    yield 8;
  },
};

Deno.test("returns true if the iterables have the same values", async () => {
  assert(hasSameValues([], []));
  assert(hasSameValues([], new Set()));
  assert(await hasSameValues(new Set(), emptyAsyncIterable));
  assert(await hasSameValues(emptyAsyncIterable, emptyAsyncIterable));

  const nineEightSevens: Array<Iterable<number>> = [
    [7, 8, 9],
    [9, 8, 7],
    new Set([9, 8, 7]),
    nineEightSeven,
  ];
  for (const a of nineEightSevens) {
    for (const b of nineEightSevens) {
      assert(hasSameValues(a, b));
      assert(hasSameValues(b, a));
      assert(await hasSameValues(asyncify(a), b));
      assert(await hasSameValues(asyncify(b), a));
      assert(await hasSameValues(asyncify(a), asyncify(b)));
    }
  }
});

Deno.test(
  "returns false if the iterables don't contain the same values",
  async () => {
    assertEquals(hasSameValues([1], []), false);
    assertEquals(hasSameValues([], [1]), false);
    assertEquals(await hasSameValues(emptyAsyncIterable, [1]), false);

    assertEquals(hasSameValues([1, 2, 3], [2, 3]), false);
    assertEquals(hasSameValues([2, 3], [1, 2, 3]), false);
    assertEquals(await hasSameValues([1, 2, 3], asyncify([2, 3])), false);
    assertEquals(
      await hasSameValues(asyncify([1, 2, 3]), asyncify([2, 3])),
      false,
    );

    assertEquals(hasSameValues([1, 2, 3], [1, 1, 2, 3]), false);
    assertEquals(hasSameValues([1, 1, 2, 3], [1, 2, 3]), false);

    assertEquals(hasSameValues(new Set([1, 2, 3]), [2, 3]), false);
    assertEquals(hasSameValues([2, 3], new Set([1, 2, 3])), false);

    assertEquals(hasSameValues(new Set([1, 2, 3]), [1, 1, 2, 2, 3]), false);

    assertEquals(hasSameValues(nineEightSeven, [7, 8]), false);
    assertEquals(hasSameValues([7, 8], nineEightSeven), false);
  },
);
