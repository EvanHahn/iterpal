import { assertEquals } from "assert";

import {
  asyncify,
  asyncIterableToArray,
  emptyAsyncIterable,
  reverse,
} from "../mod.ts";

Deno.test("reverses iterables", async () => {
  assertEquals([...reverse([])], []);
  assertEquals([...reverse([1, 2, 3])], [3, 2, 1]);
  assertEquals([...reverse(new Set([1, 2, 3]))], [3, 2, 1]);

  assertEquals(await asyncIterableToArray(reverse(emptyAsyncIterable)), []);
  assertEquals(
    await asyncIterableToArray(reverse(asyncify([1, 2, 3]))),
    [3, 2, 1],
  );
});
