import test from "ava";
import sinon from "sinon";

import concat from "../concat.js";

test("doesn't return the same iterable even when passed 1 iterable", (t) => {
  const arr = [1, 2, 3];
  t.not(concat([arr]), arr);
});

test("handling empty iterables", (t) => {
  const customEmpty = {
    *[Symbol.iterator]() {},
  };

  t.deepEqual([...concat([[], []])], []);
  t.deepEqual([...concat([new Set(), []])], []);
  t.deepEqual([...concat([[], customEmpty])], []);
  t.deepEqual([...concat([[], customEmpty, new Set(), new Map()])], []);
});

test("concatenates multiple iterables", (t) => {
  const everyNumber = {
    *[Symbol.iterator]() {
      for (let i = 4; true; i++) {
        yield i;
      }
    },
  };

  const result = concat([[1, 2], new Set([3]), new Map(), everyNumber]);
  const iterator = result[Symbol.iterator]();

  t.deepEqual(iterator.next(), { value: 1, done: false });
  t.deepEqual(iterator.next(), { value: 2, done: false });
  t.deepEqual(iterator.next(), { value: 3, done: false });
  t.deepEqual(iterator.next(), { value: 4, done: false });
  t.deepEqual(iterator.next(), { value: 5, done: false });
  t.deepEqual(iterator.next(), { value: 6, done: false });
  t.deepEqual(iterator.next(), { value: 7, done: false });
});

test("doesn't start the iterable until the last minute", (t) => {
  t.plan(0);

  const oneTwoThree = {
    [Symbol.iterator]: sinon.fake(() => {
      let n = 0;
      return {
        next() {
          if (n > 3) {
            return { done: true };
          } else {
            n++;
            return { value: n, done: false };
          }
        },
      };
    }),
  };

  const result = concat([[1, 2], oneTwoThree]);
  const iterator = result[Symbol.iterator]();

  sinon.assert.notCalled(oneTwoThree[Symbol.iterator]);

  iterator.next();
  sinon.assert.notCalled(oneTwoThree[Symbol.iterator]);
  iterator.next();
  sinon.assert.notCalled(oneTwoThree[Symbol.iterator]);

  iterator.next();
  sinon.assert.calledOnce(oneTwoThree[Symbol.iterator]);

  iterator.next();
  sinon.assert.calledOnce(oneTwoThree[Symbol.iterator]);
});
