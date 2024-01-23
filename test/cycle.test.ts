import { assertEquals, assertThrows } from "assert";

import cycle from "../cycle.ts";
import take from "../take.js";

Deno.test("throws when calling iterating if the iterable is empty", () => {
  const customEmpty = {
    *[Symbol.iterator]() {},
  };

  for (const iterable of [[], new Set(), customEmpty]) {
    const iterator = cycle(iterable)[Symbol.iterator]();
    assertThrows(() => {
      iterator.next();
    });
  }
});

Deno.test("repeats a one-element iterable", () => {
  const justOne = {
    *[Symbol.iterator]() {
      yield "hi";
    },
  };

  assertEquals([...take(cycle([1]), 5)], [1, 1, 1, 1, 1]);
  assertEquals([...take(cycle(justOne), 5)], ["hi", "hi", "hi", "hi", "hi"]);
});

Deno.test("repeats iterables", () => {
  const abc = {
    *[Symbol.iterator]() {
      yield "a";
      yield "b";
      yield "c";
    },
  };

  assertEquals([...take(cycle([1, 2, 3]), 7)], [1, 2, 3, 1, 2, 3, 1]);
  assertEquals([...take(cycle(abc), 5)], ["a", "b", "c", "a", "b"]);
});

Deno.test("effectively does nothing to infinite iterables", () => {
  const infinite = {
    *[Symbol.iterator]() {
      for (let i = 5; true; i++) {
        yield i;
      }
    },
  };

  assertEquals([...take(cycle(infinite), 7)], [5, 6, 7, 8, 9, 10, 11]);
});
