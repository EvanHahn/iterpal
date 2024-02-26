import { assertEquals } from "assert";
import { assertSpyCalls, spy } from "mock";

import {
  asyncify,
  asyncIterableToArray,
  emptyAsyncIterable,
  map,
} from "../mod.ts";

Deno.test(
  "returns an empty iterable when passed an empty iterable",
  async () => {
    const fn = spy();

    assertEquals([...map([], fn)], []);
    assertEquals([...map(new Set(), fn)], []);
    assertEquals([...map(new Map(), fn)], []);

    assertEquals(await asyncIterableToArray(map(emptyAsyncIterable, fn)), []);

    assertSpyCalls(fn, 0);
  },
);

Deno.test("returns a new iterator with values mapped", async () => {
  const fn = spy((n: number) => n * n);

  const resultSync = map([1, 2, 3], fn);
  assertSpyCalls(fn, 0);
  assertEquals([...resultSync], [1, 4, 9]);
  assertSpyCalls(fn, 3);

  const resultAsync = map(asyncify([1, 2, 3]), fn);
  assertSpyCalls(fn, 3);
  assertEquals(await asyncIterableToArray(resultAsync), [1, 4, 9]);
  assertSpyCalls(fn, 6);

  const resultAsync2 = map(
    asyncify([1, 2, 3]),
    (n) => Promise.resolve(n * n * n),
  );
  assertEquals(await asyncIterableToArray(resultAsync2), [1, 8, 27]);
});

Deno.test('iterating doesn\'t "spend" the iterable', () => {
  const result = map([1, 2, 3], (n) => n * n);

  assertEquals([...result], [1, 4, 9]);
  assertEquals([...result], [1, 4, 9]);
  assertEquals([...result], [1, 4, 9]);
});

Deno.test("can map over an infinite iterable", async () => {
  const everyNumberSync = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        yield i;
      }
    },
  };
  const resultSync = map(everyNumberSync, (n) => n * n);
  const iteratorSync = resultSync[Symbol.iterator]();
  assertEquals(iteratorSync.next(), { value: 0, done: false });
  assertEquals(iteratorSync.next(), { value: 1, done: false });
  assertEquals(iteratorSync.next(), { value: 4, done: false });
  assertEquals(iteratorSync.next(), { value: 9, done: false });

  const everyNumberAsync = asyncify(everyNumberSync);
  const resultAsync = map(everyNumberAsync, (n) => n * n);
  const iteratorAsync = resultAsync[Symbol.asyncIterator]();
  assertEquals(await iteratorAsync.next(), { value: 0, done: false });
  assertEquals(await iteratorAsync.next(), { value: 1, done: false });
  assertEquals(await iteratorAsync.next(), { value: 4, done: false });
  assertEquals(await iteratorAsync.next(), { value: 9, done: false });
});

Deno.test("prefers sync iterables", () => {
  const hybrid: Iterable<number> & AsyncIterable<number> = {
    *[Symbol.iterator]() {
      yield* [1, 2, 3];
    },
    async *[Symbol.asyncIterator]() {
      yield* [4, 5, 6];
    },
  };
  assertEquals([...map(hybrid, (n) => n * n)], [1, 4, 9]);
});
