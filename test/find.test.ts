import { assertEquals } from "assert";

import { asyncify, emptyAsyncIterable, find } from "../mod.ts";

const isTen = (n: number) => n === 10;

Deno.test("finds the first matching element and returns it", async () => {
  const everyNumberSync = {
    *[Symbol.iterator]() {
      for (let i = 5; true; i++) {
        yield i;
      }
    },
  };
  assertEquals(find(everyNumberSync, isTen), 10);

  const everyNumberAsync = asyncify(everyNumberSync);
  assertEquals(await find(everyNumberAsync, isTen), 10);
});

Deno.test("returns undefined if the value is not found", async () => {
  assertEquals(find([], isTen), undefined);
  assertEquals(find([1, 2, 3], isTen), undefined);

  assertEquals(await find(emptyAsyncIterable, isTen), undefined);
  assertEquals(await find(asyncify([1, 2, 3]), isTen), undefined);
});

Deno.test("prefers sync iterables", () => {
  const hybrid: Iterable<number> & AsyncIterable<number> = {
    *[Symbol.iterator]() {
      yield* [12, 11, 10];
    },
    async *[Symbol.asyncIterator]() {
      yield* [1, 2, 3];
    },
  };
  assertEquals(find(hybrid, isTen), 10);
});
