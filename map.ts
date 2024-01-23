export default <T, U>(
  iterable: Iterable<T>,
  fn: (value: T) => U,
): Iterable<U> => new MapIterable(iterable, fn);

class MapIterable<T, U> implements Iterable<U> {
  #iterable: Iterable<T>;
  #fn: (value: T) => U;

  constructor(iterable: Iterable<T>, fn: (value: T) => U) {
    this.#iterable = iterable;
    this.#fn = fn;
  }

  [Symbol.iterator]() {
    const iterator = this.#iterable[Symbol.iterator]();
    const fn = this.#fn;

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
