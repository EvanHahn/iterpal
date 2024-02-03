import { assert, assertEquals } from "assert";
import { assertSpyCalls, spy } from "mock";

import filter from "../filter.ts";

Deno.test("does nothing to empty iterables", () => {
  const fn = spy(() => true);

  assertEquals([...filter([], fn)], []);
  assertEquals([...filter(new Set(), fn)], []);
  assertEquals([...filter(new Map(), fn)], []);

  assertSpyCalls(fn, 0);
});

Deno.test("returns a new iterator with values filtered", () => {
  const fn = spy((n: number) => Boolean(n % 2));
  const result = filter([1, 2, 3, 4, 5], fn);

  assertSpyCalls(fn, 0);

  assertEquals([...result], [1, 3, 5]);
  assert(!(result instanceof Array));

  assertSpyCalls(fn, 5);
});

Deno.test("can filter an infinite iterable", () => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 1; true; i++) {
        yield i;
      }
    },
  };

  const fn = (n: number) => Boolean(n % 2);
  const result = filter(everyNumber, fn);
  const iterator = result[Symbol.iterator]();

  assertEquals(iterator.next(), { value: 1, done: false });
  assertEquals(iterator.next(), { value: 3, done: false });
  assertEquals(iterator.next(), { value: 5, done: false });
  assertEquals(iterator.next(), { value: 7, done: false });
});
