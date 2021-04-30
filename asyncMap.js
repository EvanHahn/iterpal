export default function asyncMap(asyncIterable, fn) {
  return new AsyncMapIterable(asyncIterable, fn);
}

class AsyncMapIterable {
  constructor(iterable, fn) {
    Object.defineProperties(this, {
      _iterable: { value: iterable },
      _fn: { value: fn },
    });
  }

  [Symbol.asyncIterator]() {
    const iterator = this._iterable[Symbol.asyncIterator]();
    const fn = this._fn;

    return {
      next() {
        return iterator.next().then(async (nextIteration) => {
          if (nextIteration.done) {
            return nextIteration;
          } else {
            return {
              done: false,
              value: await fn(nextIteration.value),
            };
          }
        });
      },
    };
  }
}
