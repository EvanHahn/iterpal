import isSync from "./_isSync.ts";

export default some;

/** @ignored */
function some<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): boolean;

/** @ignored */
function some<T>(
  iterable: AsyncIterable<T>,
  predicate: (value: T) => boolean,
): Promise<boolean>;

/**
 * Returns true if at least one element matches the predicate, and false otherwise.
 *
 * Similar to `Array.prototype.some`.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * Returns false for empty iterables.
 *
 * @example
 * ```typescript
 * function isEven(n) {
 *   return n % 2 === 0;
 * }
 *
 * const mySet = new Set([1, 2, 3]);
 * some(mySet, isEven);
 * // => true
 *
 * some([1, 3, 5], isEven);
 * // => false
 *
 * some([], () => true);
 * // => false
 * ```
 */
function some<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  predicate: (value: T) => boolean,
): boolean | Promise<boolean> {
  return isSync(iterable)
    ? someSync(iterable, predicate)
    : someAsync(iterable, predicate);
}

function someSync<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean,
): boolean {
  for (const value of iterable) {
    if (predicate(value)) return true;
  }
  return false;
}

async function someAsync<T>(
  iterable: AsyncIterable<T>,
  predicate: (value: T) => boolean,
): Promise<boolean> {
  for await (const value of iterable) {
    if (predicate(value)) return true;
  }
  return false;
}
