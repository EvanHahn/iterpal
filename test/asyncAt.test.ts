import { assertEquals } from "assert";

import { asyncAt, asyncify } from "../mod.ts";

Deno.test(
  "returns undefined when accessing an out-of-bounds value",
  async () => {
    const iterable = asyncify(["a", "b", "c"]);

    assertEquals(await asyncAt(iterable, 3), undefined);
    assertEquals(await asyncAt(iterable, 4), undefined);
    assertEquals(await asyncAt(iterable, 100), undefined);
  },
);

Deno.test("returns the value at the nth iteration", async () => {
  const everyNumberSquared: AsyncIterable<number> = {
    async *[Symbol.asyncIterator]() {
      for (let i = 0; true; i++) {
        yield i * i;
      }
    },
  };

  assertEquals(await asyncAt(everyNumberSquared, 0), 0);
  assertEquals(await asyncAt(everyNumberSquared, 1), 1);
  assertEquals(await asyncAt(everyNumberSquared, 100), 100 * 100);
});

Deno.test("works with sync iterables", async () => {
  assertEquals(await asyncAt([1, 2, 3], 1), 2);
});

Deno.test("stops early if the iterator is done", async () => {
  let nextCallCount = 0;
  const firstThree: AsyncIterable<unknown> = {
    [Symbol.asyncIterator]: () => {
      return {
        next() {
          nextCallCount++;
          return Promise.resolve(
            nextCallCount > 2
              ? { done: true, value: undefined }
              : { done: false, value: nextCallCount },
          );
        },
      };
    },
  };

  await asyncAt(firstThree, 1000);
  assertEquals(nextCallCount, 3);
});
