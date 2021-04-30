import test from "ava";
import asyncIterableToArray from "../asyncIterableToArray.js";

import asyncify from "../asyncify.js";

test("converts an empty sync iterable to an async one", async (t) => {
  const empty = {
    *[Symbol.iterator]() {},
  };
  const emptyAsync = asyncify(empty);
  t.deepEqual(await asyncIterableToArray(emptyAsync), []);
});

test("converts a non-empty sync iterable to an async one", async (t) => {
  const result = asyncify([1, 2, 3]);
  t.deepEqual(await asyncIterableToArray(result), [1, 2, 3]);
});

test("converts a sync infinite iterable to an async one", async (t) => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        yield i;
      }
    },
  };
  const iterator = asyncify(everyNumber)[Symbol.asyncIterator]();

  t.deepEqual(await iterator.next(), { done: false, value: 0 });
  t.deepEqual(await iterator.next(), { done: false, value: 1 });
  t.deepEqual(await iterator.next(), { done: false, value: 2 });
  t.deepEqual(await iterator.next(), { done: false, value: 3 });
  t.deepEqual(await iterator.next(), { done: false, value: 4 });
});
