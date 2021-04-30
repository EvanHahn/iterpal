import test from "ava";

import first from "../first.js";

test("returns undefined for empty iterables", (t) => {
  const customEmpty = {
    *[Symbol.iterator]() {},
  };

  t.is(first([]), undefined);
  t.is(first(new Set()), undefined);
  t.is(first(new Map()), undefined);
  t.is(first(customEmpty), undefined);
});

test("returns the first value", (t) => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 1; true; i++) {
        yield i;
      }
    },
  };
  const objToTestReferenceEquality = {};

  t.is(first(everyNumber), 1);
  t.is(first([objToTestReferenceEquality]), objToTestReferenceEquality);
});
