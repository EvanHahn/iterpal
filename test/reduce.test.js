import { assertEquals } from "assert";
import { assertSpyCall, assertSpyCalls, spy } from "mock";

import reduce from "../reduce.js";

Deno.test("returns the accumulator if the iterable is empty", () => {
  const fn = spy();

  assertEquals(reduce([], fn, 0), 0);
  assertEquals(reduce(new Map(), fn, 100), 100);

  assertSpyCalls(fn, 0);
});

Deno.test("reduces over the iterable, returning a single value", () => {
  const add = spy((a, b) => a + b);

  assertEquals(reduce([1, 2, 3], add, 0), 6);
  assertSpyCalls(add, 3);
  assertSpyCall(add, 0, { args: [0, 1] });
  assertSpyCall(add, 1, { args: [1, 2] });
  assertSpyCall(add, 2, { args: [3, 3] });
});
