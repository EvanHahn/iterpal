import { assertEquals } from "assert";

import { min } from "../mod.ts";

Deno.test("returns undefined with an empty iterable", () => {
  assertEquals(min([]), undefined);
  assertEquals(min(new Set([])), undefined);
});

Deno.test("returns the largest number", () => {
  assertEquals(min([3, 1, 2]), 1);
  assertEquals(min([3, 1, -2]), -2);
  assertEquals(min([-3, -1, -2]), -3);
  assertEquals(min([Infinity, -Infinity]), -Infinity);

  assertEquals(min([3n, 1n, 2n]), 1n);

  assertEquals(min([10, 5n, 12, 50n]), 5n);
});
