import isSync from "./_isSync.ts";

export default every;

/** @ignored */
function every<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): boolean;

/** @ignored */
function every<T>(
  iterable: AsyncIterable<T>,
  predicate: (value: T) => boolean,
): Promise<boolean>;

/**
 * Returns `true` if `predicate(value)` returns true for every value in `iterable`, and false otherwise. Returns `true` for an empty iterable.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * @example
 * ```typescript
 * const isEven = (n) => n % 2 === 0;
 *
 * const mySet = new Set([2, 4, 6, 8]);
 * every(mySet, isEven);
 * // => true
 *
 * every([2, 3, 4], isEven);
 * // => false
 *
 * every([], () => false);
 * // => true
 * ```
 */
function every<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  predicate: (value: T) => boolean,
): boolean | Promise<boolean> {
  return isSync(iterable)
    ? everySync(iterable, predicate)
    : everyAsync(iterable, predicate);
}

function everySync<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): boolean {
  for (const value of iterable) {
    if (!predicate(value)) return false;
  }
  return true;
}

async function everyAsync<T>(
  iterable: AsyncIterable<T>,
  predicate: (value: T) => boolean,
): Promise<boolean> {
  for await (const value of iterable) {
    if (!predicate(value)) return false;
  }
  return true;
}
