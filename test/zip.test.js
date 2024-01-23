import { assertEquals } from "assert";

import zip from "../zip.js";

Deno.test("zips multiple iterables, stopping when the first is exhausted", () => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 0; true; i++) {
        yield i;
      }
    },
  };
  const smallSet = new Set(["foo", "bar", "baz"]);
  const arr = [99, 98, 97, 96];

  assertEquals(
    [...zip([smallSet, everyNumber], everyNumber)],
    [
      ["foo", 0],
      ["bar", 1],
      ["baz", 2],
    ],
  );
  assertEquals(
    [...zip([smallSet, everyNumber, arr], everyNumber)],
    [
      ["foo", 0, 99],
      ["bar", 1, 98],
      ["baz", 2, 97],
    ],
  );

  assertEquals(
    [...zip([arr, smallSet])],
    [
      [99, "foo"],
      [98, "bar"],
      [97, "baz"],
      [96, undefined],
    ],
  );

  const infiniteZipper = zip([everyNumber, arr])[Symbol.iterator]();
  assertEquals(infiniteZipper.next(), {
    done: false,
    value: [0, 99],
  });
  assertEquals(infiniteZipper.next(), {
    done: false,
    value: [1, 98],
  });
  assertEquals(infiniteZipper.next(), {
    done: false,
    value: [2, 97],
  });
  assertEquals(infiniteZipper.next(), {
    done: false,
    value: [3, 96],
  });
  assertEquals(infiniteZipper.next(), {
    done: false,
    value: [4, undefined],
  });
  assertEquals(infiniteZipper.next(), {
    done: false,
    value: [5, undefined],
  });
});
