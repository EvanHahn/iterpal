import { assertEquals } from "assert";

import at from "../at.js";

Deno.test("returns undefined when accessing an out-of-bounds value", () => {
  assertEquals(at(["a", "b", "c"], 3), undefined);
  assertEquals(at(["a", "b", "c"], 4), undefined);
  assertEquals(at(["a", "b", "c"], 100), undefined);
  assertEquals(at("abc", 3), undefined);
});

Deno.test("returns the value at the nth iteration", () => {
  const everyNumberSquared = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        yield i * i;
      }
    },
  };

  assertEquals(at("abcdef", 0), "a");
  assertEquals(at("abcdef", 3), "d");
  assertEquals(at(everyNumberSquared, 0), 0);
  assertEquals(at(everyNumberSquared, 1), 1);
  assertEquals(at(everyNumberSquared, 100), 100 * 100);
});

Deno.test("stops early if the iterator is done", () => {
  let nextCallCount = 0;
  const firstThree = {
    [Symbol.iterator]: () => {
      return {
        next: () => {
          nextCallCount++;
          if (nextCallCount > 2) {
            return { done: true };
          } else {
            return {
              value: nextCallCount,
              done: false,
            };
          }
        },
      };
    },
  };

  at(firstThree, 1000);
  assertEquals(nextCallCount, 3);
});
