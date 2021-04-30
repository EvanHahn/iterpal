import test from "ava";

import repeatedly from "../repeatedly.js";
import sinon from "sinon";

test("calls a function over and over", (t) => {
  const double = sinon.fake((n) => n + n);
  const doubleIterable = repeatedly(double);

  const iterator1 = doubleIterable[Symbol.iterator]();
  t.deepEqual(iterator1.next(), { value: 0, done: false });
  t.deepEqual(iterator1.next(), { value: 2, done: false });
  t.deepEqual(iterator1.next(), { value: 4, done: false });
  t.deepEqual(iterator1.next(), { value: 6, done: false });
  sinon.assert.callCount(double, 4);

  const iterator2 = doubleIterable[Symbol.iterator]();
  t.deepEqual(iterator2.next(), { value: 0, done: false });
  t.deepEqual(iterator2.next(), { value: 2, done: false });
  t.deepEqual(iterator2.next(), { value: 4, done: false });
  t.deepEqual(iterator2.next(), { value: 6, done: false });
  sinon.assert.callCount(double, 8);
});
