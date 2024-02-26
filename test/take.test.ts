import { assertEquals } from "assert";

import { asyncify, asyncIterableToArray, take } from "../mod.ts";

Deno.test("returns the first n elements from an iterable", async () => {
  const everyNumberSync = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) yield i;
    },
  };
  assertEquals([...take(everyNumberSync, 0)], []);
  assertEquals([...take(everyNumberSync, 1)], [0]);
  assertEquals([...take(everyNumberSync, 7)], [0, 1, 2, 3, 4, 5, 6]);

  const everyNumberAsync = asyncify(everyNumberSync);
  assertEquals(await asyncIterableToArray(take(everyNumberAsync, 0)), []);
  assertEquals(await asyncIterableToArray(take(everyNumberAsync, 1)), [0]);
  assertEquals(
    await asyncIterableToArray(take(everyNumberAsync, 4)),
    [0, 1, 2, 3],
  );
});

Deno.test("iterates the minimum possible amount", async () => {
  class NumbersSync implements Iterable<number> {
    public iterationCount = 0;
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        this.iterationCount++;
        yield i;
      }
    }
  }

  const sync1 = new NumbersSync();
  [...take(sync1, 0)];
  assertEquals(sync1.iterationCount, 0);

  const sync2 = new NumbersSync();
  [...take(sync2, 3)];
  assertEquals(sync2.iterationCount, 3);

  class NumbersAsync implements AsyncIterable<number> {
    public iterationCount = 0;
    async *[Symbol.asyncIterator]() {
      for (let i = 0; true; i++) {
        this.iterationCount++;
        yield i;
      }
    }
  }

  const async1 = new NumbersAsync();
  await asyncIterableToArray(take(async1, 0));
  assertEquals(async1.iterationCount, 0);

  const async2 = new NumbersAsync();
  await asyncIterableToArray(take(async2, 3));
  assertEquals(async2.iterationCount, 3);
});

Deno.test("stops after the iterable has been exhausted", async () => {
  const set = new Set([1, 2, 3]);
  assertEquals([...take(set, 3)], [1, 2, 3]);
  assertEquals([...take(set, 4)], [1, 2, 3]);
  assertEquals([...take(set, 10000)], [1, 2, 3]);

  assertEquals(
    await asyncIterableToArray(take(asyncify([1, 2, 3]), 3)),
    [1, 2, 3],
  );
});
