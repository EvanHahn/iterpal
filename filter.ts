/**
 * Returns a new iterable which iterates over `iterable`, yielding when `predicate(value)` returns a truthy value.
 *
 * The predicate function is invoked with one argument: the current value.
 *
 * @example
 * ```typescript
 * const isEven = (n) => n % 2 === 0;
 *
 * const mySet = new Set([1, 2, 3, 4, 5, 6]);
 *
 * filter(mySet, isEven);
 * // => Iterable yielding 2, 4, 6
 * ```
 */
export default function filter<T>(
  iterable: Iterable<T>,
  fn: (value: T) => boolean,
): Iterable<T> {
  return new FilterIterable(iterable, fn);
}

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
