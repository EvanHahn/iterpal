import isSync from "./_isSync.ts";

export default reduce;

/** @ignored */
function reduce<T, U>(
  iterable: Iterable<T>,
  fn: (previousValue: U, currentValue: T) => U,
  accumulator: U,
): U;

/** @ignored */
function reduce<T, U>(
  iterable: AsyncIterable<T>,
  fn: (previousValue: U, currentValue: T) => U | Promise<U>,
  accumulator: U,
): U;

/**
 * Reduces `iterable` to a single value. On each iteration, calls `fn` with the result so far (starting at `accumulator`) and the current value.
 *
 * Similar to `Array.prototype.reduce`.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * @example
 * ```javascript
 * reduce(numbers, (total, n) => total + n, 0);
 * // => 1234
 * ```
 */
function reduce<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (previousValue: U, currentValue: T) => U | Promise<U>,
  accumulator: U,
): U | Promise<U> {
  return isSync(iterable)
    ? reduceSync(
      iterable,
      fn as (previousValue: U, currentValue: T) => U,
      accumulator,
    )
    : reduceAsync(iterable, fn, accumulator);
}

function reduceSync<T, U>(
  iterable: Iterable<T>,
  fn: (previousValue: U, currentValue: T) => U,
  accumulator: U,
): U {
  let result = accumulator;
  for (const value of iterable) {
    result = fn(result, value);
  }
  return result;
}

async function reduceAsync<T, U>(
  asyncIterable: AsyncIterable<T>,
  fn: (previousValue: U, currentValue: T) => U | Promise<U>,
  accumulator: U,
): Promise<U> {
  let result = accumulator;
  for await (const value of asyncIterable) {
    result = await fn(result, value);
  }
  return result;
}
