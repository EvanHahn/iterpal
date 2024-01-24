/**
 * Returns a new asynchronous iterable which iterates over `asyncIterable`, yielding `fn(value)` for each value. If `fn` returns a Promise, it will be awaited.
 *
 * @example
 * ```typescript
 * const someNumbers = {
 *   async *[Symbol.asyncIterator]() {
 *     yield 1;
 *     yield 2;
 *     yield 3;
 *   },
 * };
 *
 * const square = (n) => n * n;
 * const doubleAsync = (n) => Promise.resolve(n + n);
 *
 * asyncMap(someNumbers, square);
 * // => Async iterable yielding 1, 4, 9
 *
 * asyncMap(someNumbers, doubleAsync);
 * // => Async iterable yielding 2, 4, 6
 * ```
 */
export default function asyncMap<T, V>(
  asyncIterable: AsyncIterable<T>,
  fn: MapFn<T, V>,
): AsyncIterable<V> {
  return new AsyncMapIterable(asyncIterable, fn);
}

type MapFn<T, V> = (value: T) => V | Promise<V>;

class AsyncMapIterable<T, V> implements AsyncIterable<V> {
  #iterable: AsyncIterable<T>;
  #fn: MapFn<T, V>;

  constructor(iterable: AsyncIterable<T>, fn: MapFn<T, V>) {
    this.#iterable = iterable;
    this.#fn = fn;
  }

  [Symbol.asyncIterator](): AsyncIterator<V> {
    return new AsyncMapIterator(
      this.#iterable[Symbol.asyncIterator](),
      this.#fn,
    );
  }
}

class AsyncMapIterator<T, V> implements AsyncIterator<V> {
  #iterator: AsyncIterator<T>;
  #fn: MapFn<T, V>;

  constructor(iterator: AsyncIterator<T>, fn: MapFn<T, V>) {
    this.#iterator = iterator;
    this.#fn = fn;
  }

  async next() {
    const nextIteration = await this.#iterator.next();
    if (nextIteration.done) return nextIteration;
    return { done: false, value: await this.#fn(nextIteration.value) };
  }
}
