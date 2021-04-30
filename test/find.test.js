import test from "ava";

import find from "../find.js";

const isTen = (n) => n === 10;

test("finds the first matching element and returns it", (t) => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 5; true; i++) {
        yield i;
      }
    },
  };

  t.is(find(everyNumber, isTen), 10);
});

test("returns undefined if the value is not found", (t) => {
  t.is(find([], isTen), undefined);
  t.is(find([1, 2, 3], isTen), undefined);
});
