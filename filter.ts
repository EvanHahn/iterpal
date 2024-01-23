export default <T>(
  iterable: Iterable<T>,
  fn: (value: T) => boolean
): Iterable<T> => new FilterIterable(iterable, fn);

class FilterIterable<T> implements Iterable<T> {
  #iterable: Iterable<T>;
  #fn: (value: T) => boolean;

  constructor(iterable: Iterable<T>, fn: (value: T) => boolean) {
    this.#iterable = iterable;
    this.#fn = fn;
  }

  [Symbol.iterator]() {
    const iterator = this.#iterable[Symbol.iterator]();
    const fn = this.#fn;

    return {
      next() {
        while (true) {
          const nextIteration = iterator.next();
          if (nextIteration.done || fn(nextIteration.value)) {
            return nextIteration;
          }
        }
      },
    };
  }
}
