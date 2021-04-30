import test from "ava";

import drop from "../drop.js";

test("drops the first n elements from an iterable", (t) => {
  t.deepEqual([...drop([1, 2, 3], 0)], [1, 2, 3]);
  t.deepEqual([...drop([1, 2, 3], 1)], [2, 3]);
  t.deepEqual([...drop([1, 2, 3], 2)], [3]);
});

test("can drop all elements from an iterable, returning an empty iterable", (t) => {
  const set = new Set([1, 2, 3]);

  t.deepEqual([...drop(set, 3)], []);
  t.deepEqual([...drop(set, 4)], []);
  t.deepEqual([...drop(set, 10000)], []);
});
