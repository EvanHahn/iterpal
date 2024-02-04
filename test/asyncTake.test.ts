import { assertEquals } from "assert";

import { asyncify, asyncIterableToArray, asyncTake } from "../mod.ts";

Deno.test("returns the first n elements from an iterable", async () => {
  const everyNumber = {
    async *[Symbol.asyncIterator]() {
      for (let i = 0; true; i++) {
        yield i;
      }
    },
  };

  assertEquals(await grab(everyNumber, 0), []);
  assertEquals(await grab(everyNumber, 1), [0]);
  assertEquals(await grab(everyNumber, 7), [0, 1, 2, 3, 4, 5, 6]);
});

Deno.test("iterates the minimum possible amount", async () => {
  class Numbers implements AsyncIterable<number> {
    public iterationCount = 0;
    async *[Symbol.asyncIterator]() {
      for (let i = 0; true; i++) {
        this.iterationCount++;
        yield i;
      }
    }
  }

  const n1 = new Numbers();
  await grab(n1, 0);
  assertEquals(n1.iterationCount, 0);

  const n2 = new Numbers();
  await grab(n2, 3);
  assertEquals(n2.iterationCount, 3);
});

Deno.test("stops after the iterable has been exhausted", async () => {
  const iterable = asyncify([1, 2, 3]);

  assertEquals(await grab(iterable, 3), [1, 2, 3]);
  assertEquals(await grab(iterable, 4), [1, 2, 3]);
  assertEquals(await grab(iterable, 10000), [1, 2, 3]);
});

async function grab<T>(iterable: AsyncIterable<T>, n: number): Promise<T[]> {
  return await asyncIterableToArray(asyncTake(iterable, n));
}
