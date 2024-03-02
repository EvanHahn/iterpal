import isSync from "./_isSync.ts";

export default find;

/** @ignored */
function find<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): undefined | T;

/** @ignored */
function find<T>(
  iterable: AsyncIterable<T>,
  predicate: (value: T) => boolean,
): Promise<undefined | T>;

/**
 * Iterates over `iterable`, returning the first element `predicate(value)` returns truthy for. Returns `undefined` if no value is found.
 *
 * Similar to `Array.prototype.find`.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * @example
 * ```typescript
 * const isEven = (n) => n % 2 === 0;
 *
 * find(new Set([1, 3, 4, 5]), isEven);
 * // => 4
 *
 * find([1, 3, 5, 7], isEven);
 * // => undefined
 *
 * find([], isEven);
 * // => undefined
 * ```
 */
function find<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  predicate: (value: T) => boolean,
): undefined | T | Promise<undefined | T> {
  return isSync(iterable)
    ? findSync(iterable, predicate)
    : findAsync(iterable, predicate);
}

function findSync<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): undefined | T {
  for (const value of iterable) {
    if (predicate(value)) return value;
  }
  return;
}

async function findAsync<T>(
  iterable: AsyncIterable<T>,
  predicate: (value: T) => boolean,
): Promise<undefined | T> {
  for await (const value of iterable) {
    if (predicate(value)) return value;
  }
  return;
}
