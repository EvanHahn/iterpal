import isSync from "./_isSync.ts";

export default filter;

/** @ignored */
function filter<T>(
  iterable: Iterable<T>,
  fn: (value: T) => boolean,
): Iterable<T>;

/** @ignored */
function filter<T>(
  iterable: AsyncIterable<T>,
  fn: (value: T) => boolean,
): AsyncIterable<T>;

/**
 * Returns a new iterable which iterates over `iterable`, yielding when `predicate(value)` returns a truthy value.
 *
 * The predicate function is invoked with one argument: the current value.
 *
 * Works with sync and async iterables.
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
function filter<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T) => boolean,
): Iterable<T> | AsyncIterable<T> {
  return isSync(iterable)
    ? new FilterIterable(iterable, fn)
    : new FilterAsyncIterable(iterable, fn);
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

class FilterAsyncIterable<T> implements AsyncIterable<T> {
  #iterable: AsyncIterable<T>;
  #fn: (value: T) => boolean;

  constructor(iterable: AsyncIterable<T>, fn: (value: T) => boolean) {
    this.#iterable = iterable;
    this.#fn = fn;
  }

  [Symbol.asyncIterator]() {
    const iterator = this.#iterable[Symbol.asyncIterator]();
    const fn = this.#fn;

    return {
      async next() {
        while (true) {
          const nextIteration = await iterator.next();
          if (nextIteration.done || fn(nextIteration.value)) {
            return nextIteration;
          }
        }
      },
    };
  }
}
