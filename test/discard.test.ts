import { assertEquals } from "assert";

import { asyncify, discard } from "../mod.ts";

Deno.test("exhausts an iterator", async () => {
  const syncIterator: Iterator<number> = [1, 2, 3][Symbol.iterator]();
  discard(syncIterator);
  assertEquals(syncIterator.next().done, true);

  const asyncIterator: AsyncIterator<number> = asyncify([1, 2, 3])
    [Symbol.asyncIterator]();
  await discard(asyncIterator);
  assertEquals((await asyncIterator.next()).done, true);
});
