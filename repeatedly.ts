export default function <T>(fn: (iterationCount: number) => T): Iterable<T> {
  return new RepeatedlyIterable(fn);
}

class RepeatedlyIterable<T> implements Iterable<T> {
  #fn: (iterationCount: number) => T;

  constructor(fn: (iterationCount: number) => T) {
    this.#fn = fn;
  }

  [Symbol.iterator]() {
    const fn = this.#fn;

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
