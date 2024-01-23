import { assertEquals } from "assert";

import join from "../join.js";

Deno.test("returns the empty string for empty iterables", () => {
  assertEquals(join([]), "");
  assertEquals(join([], "~"), "");
  assertEquals(join(new Set(), "~"), "");
});

Deno.test("joins iterables with commas by default", () => {
  const values = {
    *[Symbol.iterator]() {
      yield "str";
      yield 1;
      yield false;
      yield undefined;
      yield null;
      yield NaN;
      yield {
        toString() {
          return "foo";
        },
      };
    },
  };

  assertEquals(join(values), "str,1,false,,,NaN,foo");
});

Deno.test("can join iterables with other separators", () => {
  const values = {
    *[Symbol.iterator]() {
      yield "str";
      yield 1;
      yield false;
      yield undefined;
      yield null;
      yield NaN;
      yield {
        toString() {
          return "foo";
        },
      };
    },
  };

  assertEquals(join(values, "~"), "str~1~false~~~NaN~foo");
  assertEquals(
    join(values, " and "),
    "str and 1 and false and  and  and NaN and foo",
  );
});
