import { assertEquals } from "assert";

import { find } from "../mod.ts";

const isTen = (n: number) => n === 10;

Deno.test("finds the first matching element and returns it", () => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 5; true; i++) {
        yield i;
      }
    },
  };

  assertEquals(find(everyNumber, isTen), 10);
});

Deno.test("returns undefined if the value is not found", () => {
  assertEquals(find([], isTen), undefined);
  assertEquals(find([1, 2, 3], isTen), undefined);
});
