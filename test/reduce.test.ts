import { assertEquals } from "assert";
import { assertSpyCall, assertSpyCalls, spy } from "mock";

import { asyncify, emptyAsyncIterable, reduce } from "../mod.ts";

Deno.test("returns the accumulator if the iterable is empty", async () => {
  const fn = spy();

  assertEquals(reduce([], fn, 0), 0);
  assertEquals(reduce(new Map(), fn, 100), 100);
  assertEquals(await reduce(emptyAsyncIterable, fn, 0), 0);

  assertSpyCalls(fn, 0);
});

Deno.test("reduces over the iterable, returning a single value", async () => {
  const add = spy((a: number, b: number) => a + b);

  assertEquals(reduce([1, 2, 3], add, 0), 6);
  assertSpyCalls(add, 3);
  assertSpyCall(add, 0, { args: [0, 1] });
  assertSpyCall(add, 1, { args: [1, 2] });
  assertSpyCall(add, 2, { args: [3, 3] });

  assertEquals(await reduce(asyncify([1, 2, 3]), add, 0), 6);
  const asyncAdd = (a: number, b: number) => Promise.resolve(a + b);
  assertEquals(await reduce(asyncify([1, 2, 3]), asyncAdd, 0), 6);
});
