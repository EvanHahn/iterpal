import { assertEquals } from "assert";

import hasSameValues from "../hasSameValues.ts";

const customIterable = {
  *[Symbol.iterator]() {
    yield 9;
    yield 7;
    yield 8;
  },
};

Deno.test("returns true if the iterables have the same values", () => {
  assertEquals(hasSameValues([], []), true);
  assertEquals(hasSameValues([9, 8, 7], [7, 8, 9]), true);
  assertEquals(hasSameValues([9, 9, 9], [9, 9, 9]), true);

  assertEquals(hasSameValues(new Set([9, 8, 7]), [7, 8, 9]), true);
  assertEquals(hasSameValues([9, 8, 7], new Set([7, 8, 9])), true);

  assertEquals(hasSameValues([9, 8, 7], customIterable), true);
});

Deno.test(
  "returns false if the iterables don't contain the same values",
  () => {
    assertEquals(hasSameValues([1], []), false);
    assertEquals(hasSameValues([], [1]), false);

    assertEquals(hasSameValues([1, 2, 3], [2, 3]), false);
    assertEquals(hasSameValues([2, 3], [1, 2, 3]), false);

    assertEquals(hasSameValues([1, 2, 3], [1, 1, 2, 3]), false);
    assertEquals(hasSameValues([1, 1, 2, 3], [1, 2, 3]), false);

    assertEquals(hasSameValues(new Set([1, 2, 3]), [2, 3]), false);
    assertEquals(hasSameValues([2, 3], new Set([1, 2, 3])), false);

    assertEquals(hasSameValues(new Set([1, 2, 3]), [1, 1, 2, 2, 3]), false);

    assertEquals(hasSameValues(customIterable, [7, 8]), false);
    assertEquals(hasSameValues([7, 8], customIterable), false);
  },
);
