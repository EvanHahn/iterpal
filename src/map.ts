import isSync from "./_isSync.ts";

export default map;

/** @ignored */
function map<T, U>(
  iterable: Iterable<T>,
  fn: (value: T) => U,
): Iterable<U>;

/** @ignored */
function map<T, U>(
  iterable: AsyncIterable<T>,
  fn: (value: T) => U | Promise<U>,
): AsyncIterable<U>;

/**
 * Creates an iterable of values by running each element in `iterable` through `fn`. Similar to `Array.prototype.map`.
 *
 * Works with sync or async iterables. If passed an async iterable, the result of `fn` will be awaited.
 *
 * @example
 * ```javascript
 * map(numbers, (n) => n * n);
 * // => Iterable yielding 1, 4, 9, 16, ...
 * ```
 */
function map<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T) => U | Promise<U>,
): Iterable<U> | AsyncIterable<U> {
  return isSync(iterable)
    ? new MapIterable(iterable, fn as (value: T) => U)
    : new MapAsyncIterable(iterable, fn);
}

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

type AsyncMapFn<T, U> = (value: T) => U | Promise<U>;

class MapAsyncIterable<T, V> implements AsyncIterable<V> {
  #iterable: AsyncIterable<T>;
  #fn: AsyncMapFn<T, V>;

  constructor(iterable: AsyncIterable<T>, fn: AsyncMapFn<T, V>) {
    this.#iterable = iterable;
    this.#fn = fn;
  }

  [Symbol.asyncIterator](): AsyncIterator<V> {
    return new MapAsyncIterator(
      this.#iterable[Symbol.asyncIterator](),
      this.#fn,
    );
  }
}

class MapAsyncIterator<T, V> implements AsyncIterator<V> {
  #iterator: AsyncIterator<T>;
  #fn: AsyncMapFn<T, V>;

  constructor(iterator: AsyncIterator<T>, fn: AsyncMapFn<T, V>) {
    this.#iterator = iterator;
    this.#fn = fn;
  }

  async next() {
    const nextIteration = await this.#iterator.next();
    if (nextIteration.done) return nextIteration;
    return { done: false, value: await this.#fn(nextIteration.value) };
  }
}
