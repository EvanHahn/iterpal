import { assertEquals } from "assert";

import { asyncify, emptyAsyncIterable, min } from "../mod.ts";

Deno.test("returns undefined with an empty iterable", async () => {
  assertEquals(min([]), undefined);
  assertEquals(min(new Set([])), undefined);

  assertEquals(await min(emptyAsyncIterable), undefined);
});

Deno.test("returns the largest number", async () => {
  assertEquals(min([3, 1, 2]), 1);
  assertEquals(min([3, 1, -2]), -2);
  assertEquals(min([-3, -1, -2]), -3);
  assertEquals(min([Infinity, -Infinity]), -Infinity);
  assertEquals(min([3n, 1n, 2n]), 1n);
  assertEquals(min([10, 5n, 12, 50n]), 5n);

  assertEquals(await min(asyncify([3, 1, 2])), 1);
});
