import { assertEquals } from "assert";

import { arrayFrom, asyncify, takeWhile } from "../mod.ts";

const isSmall = (n: number) => n < 4;
const alwaysFalse = () => false;

Deno.test("takes until the function returns false", async () => {
  const everyNumberSync = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) yield i;
    },
  };
  assertEquals([...takeWhile(everyNumberSync, isSmall)], [0, 1, 2, 3]);

  const everyNumberAsync = asyncify(everyNumberSync);
  assertEquals(
    await arrayFrom(takeWhile(everyNumberAsync, isSmall)),
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
  [...takeWhile(sync1, alwaysFalse)];
  assertEquals(sync1.iterationCount, 1);

  const sync2 = new NumbersSync();
  [...takeWhile(sync2, isSmall)];
  assertEquals(sync2.iterationCount, 5);

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
  await arrayFrom(takeWhile(async1, alwaysFalse));
  assertEquals(async1.iterationCount, 1);

  const async2 = new NumbersAsync();
  await arrayFrom(takeWhile(async2, isSmall));
  assertEquals(async2.iterationCount, 5);
});

Deno.test("stops after the iterable has been exhausted", async () => {
  assertEquals([...takeWhile([1, 2], isSmall)], [1, 2]);

  assertEquals(await arrayFrom(takeWhile(asyncify([1, 2]), isSmall)), [1, 2]);
});

Deno.test("prefers sync iterables", () => {
  const hybrid: Iterable<number> & AsyncIterable<number> = {
    *[Symbol.iterator]() {
      yield* [1];
    },
    async *[Symbol.asyncIterator]() {
      yield* [2];
    },
  };
  assertEquals([...takeWhile(hybrid, isSmall)], [1]);
});
