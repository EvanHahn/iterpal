import { assertEquals, assertNotStrictEquals } from "assert";
import { assertSpyCalls, spy } from "mock";

import concat from "../concat.ts";

Deno.test(
  "doesn't return the same iterable even when passed 1 iterable",
  () => {
    const arr = [1, 2, 3];
    assertNotStrictEquals(concat([arr]), arr);
  }
);

Deno.test("handling empty iterables", () => {
  const customEmpty = {
    *[Symbol.iterator]() {},
  };

  assertEquals([...concat([[], []])], []);
  assertEquals([...concat([new Set(), []])], []);
  assertEquals([...concat([[], customEmpty])], []);
  assertEquals([...concat([[], customEmpty, new Set(), new Map()])], []);
});

Deno.test("concatenates multiple iterables", () => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 4; true; i++) {
        yield i;
      }
    },
  };

  const result = concat([[1, 2], new Set([3]), everyNumber]);
  const iterator = result[Symbol.iterator]();

  assertEquals(iterator.next(), { value: 1, done: false });
  assertEquals(iterator.next(), { value: 2, done: false });
  assertEquals(iterator.next(), { value: 3, done: false });
  assertEquals(iterator.next(), { value: 4, done: false });
  assertEquals(iterator.next(), { value: 5, done: false });
  assertEquals(iterator.next(), { value: 6, done: false });
  assertEquals(iterator.next(), { value: 7, done: false });
});

Deno.test("doesn't start the iterable until the last minute", () => {
  const oneTwoThree = {
    [Symbol.iterator]: spy(() => {
      let n = 0;
      return {
        next() {
          if (n > 3) {
            return { done: true, value: undefined };
          } else {
            n++;
            return { done: false, value: n };
          }
        },
      };
    }),
  };

  const result = concat([[1, 2], oneTwoThree]);
  const iterator = result[Symbol.iterator]();

  iterator.next();
  iterator.next();
  assertSpyCalls(oneTwoThree[Symbol.iterator], 0);

  iterator.next();
  assertSpyCalls(oneTwoThree[Symbol.iterator], 1);

  iterator.next();
  assertSpyCalls(oneTwoThree[Symbol.iterator], 1);
});
