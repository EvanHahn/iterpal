import { assertEquals } from "assert";

import max from "../max.js";

Deno.test("returns undefined with an empty iterable", () => {
  assertEquals(max([]), undefined);
  assertEquals(max(new Set([])), undefined);
});

Deno.test("returns the largest number", () => {
  assertEquals(max([3, 1, 2]), 3);
  assertEquals(max([3, 1, -2]), 3);
  assertEquals(max([-3, -1, -2]), -1);
  assertEquals(max([Infinity, -Infinity]), Infinity);

  assertEquals(max([10, BigInt(5), 12, BigInt(50)]), BigInt(50));
});
