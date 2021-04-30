export default function concat(iterables) {
  return new ConcatIterable(iterables);
}

class ConcatIterable {
  constructor(iterables) {
    Object.defineProperty(this, "_iterables", {
      value: iterables,
    });
  }

  *[Symbol.iterator]() {
    for (const iterable of this._iterables) {
      for (const value of iterable) {
        yield value;
      }
    }
  }
}
