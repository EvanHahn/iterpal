import { assertEquals } from "assert";

import drop from "../drop.ts";

Deno.test("drops the first n elements from an iterable", () => {
  assertEquals([...drop([1, 2, 3], 0)], [1, 2, 3]);
  assertEquals([...drop([1, 2, 3], 1)], [2, 3]);
  assertEquals([...drop([1, 2, 3], 2)], [3]);
});

Deno.test("can drop all elements from an iterable, returning an empty iterable", () => {
  const set = new Set([1, 2, 3]);

  assertEquals([...drop(set, 3)], []);
  assertEquals([...drop(set, 4)], []);
  assertEquals([...drop(set, 10000)], []);
});
