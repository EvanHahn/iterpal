export default function asyncify(iterable) {
  return new AsyncifyIterable(iterable);
}

class AsyncifyIterable {
  constructor(iterable) {
    Object.defineProperty(this, "_iterable", { value: iterable });
  }

  [Symbol.asyncIterator]() {
    const iterator = this._iterable[Symbol.iterator]();
    return {
      next() {
        return Promise.resolve(iterator.next());
      },
    };
  }
}
