import test from "ava";

import every from "../every.js";

test("returns true for empty iterables", (t) => {
  const alwaysFalse = () => false;
  t.true(every([], alwaysFalse));
  t.true(every(new Map(), alwaysFalse));
});

test("returns true if all of the elements return true", (t) => {
  const isThree = (n) => n === 3;

  t.true(every([3], isThree));
  t.true(every(new Set([3, 3]), isThree));
  t.true(every([3, 3, 3], isThree));
});

test("returns false if every of the elements return false", (t) => {
  const isThree = (n) => n === 3;

  t.false(every([1, 2, 3, 4], isThree));
  t.false(every(new Set([1, 2, 3, 4]), isThree));
});
