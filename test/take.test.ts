import { assertEquals } from "assert";

import { take } from "../mod.ts";

Deno.test("returns the first n elements from an iterable", () => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        yield i;
      }
    },
  };

  assertEquals([...take(everyNumber, 0)], []);
  assertEquals([...take(everyNumber, 1)], [0]);
  assertEquals([...take(everyNumber, 7)], [0, 1, 2, 3, 4, 5, 6]);
});

Deno.test("iterates the minimum possible amount", () => {
  class Numbers implements Iterable<number> {
    public iterationCount = 0;
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        this.iterationCount++;
        yield i;
      }
    }
  }

  const n1 = new Numbers();
  [...take(n1, 0)];
  assertEquals(n1.iterationCount, 0);

  const n2 = new Numbers();
  [...take(n2, 3)];
  assertEquals(n2.iterationCount, 3);
});

Deno.test("stops after the iterable has been exhausted", () => {
  const set = new Set([1, 2, 3]);

  assertEquals([...take(set, 3)], [1, 2, 3]);
  assertEquals([...take(set, 4)], [1, 2, 3]);
  assertEquals([...take(set, 10000)], [1, 2, 3]);
});
