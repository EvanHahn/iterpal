import { assertSpyCall, assertSpyCalls, spy } from "mock";

import { asyncify, emptyAsyncIterable, forEach } from "../mod.ts";

Deno.test("does nothing when passed an async iterable", async () => {
  const fn = spy();

  forEach([], fn);
  forEach(new Set(), fn);
  await forEach(emptyAsyncIterable, fn);

  assertSpyCalls(fn, 0);
});

Deno.test("calls the function for each element of a sync iterable", () => {
  const fn = spy();

  forEach(new Set([9, 8, 7]), fn);

  assertSpyCalls(fn, 3);
  assertSpyCall(fn, 0, { args: [9] });
  assertSpyCall(fn, 1, { args: [8] });
  assertSpyCall(fn, 2, { args: [7] });
});

Deno.test("calls the function for each element of an async iterable", async () => {
  const fn = spy();

  await forEach(asyncify([9, 8, 7]), fn);

  assertSpyCalls(fn, 3);
  assertSpyCall(fn, 0, { args: [9] });
  assertSpyCall(fn, 1, { args: [8] });
  assertSpyCall(fn, 2, { args: [7] });
});

Deno.test("prefers sync iterables", () => {
  const fn = spy();
  const hybrid: Iterable<number> & AsyncIterable<number> = {
    *[Symbol.iterator]() {
      yield* [1, 2, 3];
    },
    async *[Symbol.asyncIterator]() {
      yield* [4, 5];
    },
  };

  forEach(hybrid, fn);

  assertSpyCalls(fn, 3);
});
