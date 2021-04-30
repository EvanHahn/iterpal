export default function (fn) {
  return new RepeatedlyIterable(fn);
}

class RepeatedlyIterable {
  constructor(fn) {
    Object.defineProperty(this, "_fn", {
      value: fn,
    });
  }

  [Symbol.iterator]() {
    const fn = this._fn;

    let iterationCount = 0;
    return {
      next() {
        const value = fn(iterationCount);
        iterationCount++;
        return {
          done: false,
          value,
        };
      },
    };
  }
}
