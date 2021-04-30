import test from "ava";
import sinon from "sinon";
import asyncIterableToArray from "../asyncIterableToArray.js";

import asyncMap from "../asyncMap.js";

test("returns an empty iterable when passed an empty iterable", async (t) => {
  const fn = sinon.fake();
  const empty = {
    async *[Symbol.asyncIterator]() {},
  };

  const result = asyncMap(empty, fn);
  const asArray = await asyncIterableToArray(result);
  t.deepEqual(asArray, []);

  sinon.assert.notCalled(fn);
});

test("returns a new iterator with values mapped, using a synchronous fn", async (t) => {
  const fn = sinon.fake((n) => n * n);
  const several = {
    async *[Symbol.asyncIterator]() {
      yield 1;
      yield 2;
      yield 3;
    },
  };

  const iterator = asyncMap(several, fn)[Symbol.asyncIterator]();

  sinon.assert.notCalled(fn);
  t.deepEqual(await iterator.next(), { done: false, value: 1 });
  sinon.assert.calledOnce(fn);
  t.deepEqual(await iterator.next(), { done: false, value: 4 });
  sinon.assert.calledTwice(fn);
  t.deepEqual(await iterator.next(), { done: false, value: 9 });
  sinon.assert.calledThrice(fn);
  t.deepEqual(await iterator.next(), { done: true, value: undefined });
  t.deepEqual(await iterator.next(), { done: true, value: undefined });
  sinon.assert.calledThrice(fn);
});

test("returns a new iterator with values mapped, using an asynchronous fn", async (t) => {
  const fn = sinon.fake((n) => Promise.resolve(n * n));
  const several = {
    async *[Symbol.asyncIterator]() {
      yield 1;
      yield 2;
      yield 3;
    },
  };

  const iterator = asyncMap(several, fn)[Symbol.asyncIterator]();

  sinon.assert.notCalled(fn);
  t.deepEqual(await iterator.next(), { done: false, value: 1 });
  sinon.assert.calledOnce(fn);
  t.deepEqual(await iterator.next(), { done: false, value: 4 });
  sinon.assert.calledTwice(fn);
  t.deepEqual(await iterator.next(), { done: false, value: 9 });
  sinon.assert.calledThrice(fn);
  t.deepEqual(await iterator.next(), { done: true, value: undefined });
  t.deepEqual(await iterator.next(), { done: true, value: undefined });
  sinon.assert.calledThrice(fn);
});

// TODO infinite iterable
