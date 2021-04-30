import test from "ava";

import reduce from "../reduce.js";
import sinon from "sinon";

test("returns the accumulator if the iterable is empty", (t) => {
  const fn = sinon.fake();

  t.is(reduce([], fn, 0), 0);
  t.is(reduce(new Map(), fn, 100), 100);

  sinon.assert.notCalled(fn);
});

test("reduces over the iterable, returning a single value", (t) => {
  const add = sinon.fake((a, b) => a + b);
  t.is(reduce([1, 2, 3], add, 0), 6);
  sinon.assert.calledThrice(add);
  sinon.assert.calledWithExactly(add.getCall(0), 0, 1);
  sinon.assert.calledWithExactly(add.getCall(1), 1, 2);
  sinon.assert.calledWithExactly(add.getCall(2), 3, 3);
});
