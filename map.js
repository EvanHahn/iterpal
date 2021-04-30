export default function map(iterable, fn) {
  return new MapIterable(iterable, fn);
}

class MapIterable {
  constructor(iterable, fn) {
    Object.defineProperties(this, {
      _iterable: { value: iterable },
      _fn: { value: fn },
    });
  }

  [Symbol.iterator]() {
    const iterator = this._iterable[Symbol.iterator]();
    const fn = this._fn;

    return {
      next() {
        const nextIteration = iterator.next();
        if (nextIteration.done) {
          return nextIteration;
        } else {
          return {
            done: false,
            value: fn(nextIteration.value),
          };
        }
      },
    };
  }
}
