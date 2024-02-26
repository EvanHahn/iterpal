import { assertEquals } from "assert";

import { asyncify, emptyAsyncIterable, max } from "../mod.ts";

Deno.test("returns undefined with an empty iterable", async () => {
  assertEquals(max([]), undefined);
  assertEquals(max(new Set([])), undefined);

  assertEquals(await max(emptyAsyncIterable), undefined);
});

Deno.test("returns the largest number", async () => {
  assertEquals(max([3, 1, 2]), 3);
  assertEquals(max([3, 1, -2]), 3);
  assertEquals(max([-3, -1, -2]), -1);
  assertEquals(max([Infinity, -Infinity]), Infinity);
  assertEquals(max([3n, 1n, 2n]), 3n);
  assertEquals(max([10, 5n, 12, 50n]), 50n);

  assertEquals(await max(asyncify([3, 1, 2])), 3);
});
