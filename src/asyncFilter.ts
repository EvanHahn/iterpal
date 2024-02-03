/**
 * Returns a new async iterable which iterates over `asyncIterable`, yielding when `predicate(value)` resolves to (or returns) a truthy value.
 *
 * The predicate function is invoked with one argument: the current value.
 *
 * @example
 * ```typescript
 * const isEven = (n) => n % 2 === 0;
 *
 * const numbers = {
 *   async *[Symbol.asyncIterator]() {
 *     for (let i = 1; i <= 6; i++) yield i;
 *   }
 * };
 *
 * asyncFilter(numbers, isEven);
 * // => Async iterable yielding 2, 4, 6
 * ```
 */
export default function asyncFilter<T>(
  asyncIterable: AsyncIterable<T>,
  fn: (value: T) => boolean | Promise<boolean>,
): AsyncIterable<T> {
  return new AsyncFilterIterable(asyncIterable, fn);
}

class AsyncFilterIterable<T> implements AsyncIterable<T> {
  #iterable: AsyncIterable<T>;
  #fn: (value: T) => boolean | Promise<boolean>;

  constructor(
    iterable: AsyncIterable<T>,
    fn: (value: T) => boolean | Promise<boolean>,
  ) {
    this.#iterable = iterable;
    this.#fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    const iterable = this.#iterable;
    const fn = this.#fn;

    for await (const value of iterable) {
      if (await fn(value)) yield value;
    }
  }
}
