import { assertEquals } from "assert";

import { arrayFrom, asyncify, emptyAsyncIterable, reverse } from "../mod.ts";

Deno.test("reverses iterables", async () => {
  assertEquals([...reverse([])], []);
  assertEquals([...reverse([1, 2, 3])], [3, 2, 1]);
  assertEquals([...reverse(new Set([1, 2, 3]))], [3, 2, 1]);

  assertEquals(await arrayFrom(reverse(emptyAsyncIterable)), []);
  assertEquals(
    await arrayFrom(reverse(asyncify([1, 2, 3]))),
    [3, 2, 1],
  );
});
