import { assertEquals } from "assert";

import max from "../max.ts";

Deno.test("returns undefined with an empty iterable", () => {
  assertEquals(max([]), undefined);
  assertEquals(max(new Set([])), undefined);
});

Deno.test("returns the largest number", () => {
  assertEquals(max([3, 1, 2]), 3);
  assertEquals(max([3, 1, -2]), 3);
  assertEquals(max([-3, -1, -2]), -1);
  assertEquals(max([Infinity, -Infinity]), Infinity);

  assertEquals(max([3n, 1n, 2n]), 3n);

  assertEquals(max([10, 5n, 12, 50n]), 50n);
});
