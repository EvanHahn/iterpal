import { assertEquals } from "assert";
import take from "../take.ts";

import zip from "../zip.ts";

Deno.test("zipping no iterables", () => {
  assertEquals([...zip()], []);
});

Deno.test("zipping empty iterables", () => {
  assertEquals([...zip([], new Set(), "ignored")], []);
});

Deno.test("zipping just one iterable", () => {
  assertEquals([...zip([1, 2, 3])], [[1], [2], [3]]);
  assertEquals([...zip(new Set([1, 2, 3]))], [[1], [2], [3]]);
});

Deno.test(
  "zips multiple iterables, stopping when the smallest is exhausted",
  () => {
    const everyNumber: Iterable<number> = {
      *[Symbol.iterator]() {
        for (let i = 0; true; i++) yield i;
      },
    };
    const smallSet = new Set(["foo", "bar", "baz"]);
    const arr = [99, 98, 97, 96];

    assertEquals(
      [...zip(smallSet, everyNumber)],
      [
        ["foo", 0],
        ["bar", 1],
        ["baz", 2],
      ],
    );
    assertEquals(
      [...zip(everyNumber, smallSet)],
      [
        [0, "foo"],
        [1, "bar"],
        [2, "baz"],
      ],
    );

    assertEquals(
      [...zip(smallSet, everyNumber, arr)],
      [
        ["foo", 0, 99],
        ["bar", 1, 98],
        ["baz", 2, 97],
      ],
    );

    const infiniteZip = zip(everyNumber, everyNumber, everyNumber);
    assertEquals(
      [...take(infiniteZip, 3)],
      [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2],
      ],
    );
  },
);
