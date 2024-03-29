import { assertEquals, assertThrows } from "assert";

import { arrayFrom, asyncify, take } from "../mod.ts";

Deno.test("throws if amount is negative", () => {
  assertThrows(() => take([], -1));
  assertThrows(() => take([], -0.1));
  assertThrows(() => take(asyncify([]), -1));
});

Deno.test("throws if amount is not a round number", () => {
  assertThrows(() => take([], 1.2));
  assertThrows(() => take(asyncify([]), 1.2));
});

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
  assertEquals(await arrayFrom(take(everyNumberAsync, 0)), []);
  assertEquals(await arrayFrom(take(everyNumberAsync, 1)), [0]);
  assertEquals(
    await arrayFrom(take(everyNumberAsync, 4)),
    [0, 1, 2, 3],
  );
});

Deno.test("allows an infinite amount", () => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) yield i;
    },
  };
  const iterator = take(everyNumber, Infinity)[Symbol.iterator]();

  for (let i = 0; i < 100; i++) assertEquals(iterator.next().value, i);
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
  await arrayFrom(take(async1, 0));
  assertEquals(async1.iterationCount, 0);

  const async2 = new NumbersAsync();
  await arrayFrom(take(async2, 3));
  assertEquals(async2.iterationCount, 3);
});

Deno.test("stops after the iterable has been exhausted", async () => {
  const set = new Set([1, 2, 3]);
  assertEquals([...take(set, 3)], [1, 2, 3]);
  assertEquals([...take(set, 4)], [1, 2, 3]);
  assertEquals([...take(set, 10000)], [1, 2, 3]);

  assertEquals(
    await arrayFrom(take(asyncify([1, 2, 3]), 3)),
    [1, 2, 3],
  );
});
