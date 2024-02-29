import isArrayOrTypedArray from "./_isArrayOrTypedArray.ts";
import isSync from "./_isSync.ts";

export default last;

/** @ignored */
function last<T>(iterable: Iterable<T>): undefined | T;

/** @ignored */
function last<T>(iterable: AsyncIterable<T>): Promise<undefined | T>;

/**
 * Iterates over `iterable`, returning the final value. Returns `undefined` if the iterable is empty.
 *
 * Exhausts the iterable.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * Has optimizations for some types, such as arrays, to avoid iterating over the whole argument. Don't count on this behavior, as it is only an optimization.
 *
 * @example
 * ```typescript
 * last(new Set(["hello", "world"]));
 * // => "world"
 *
 * last([10, 11, 12]);
 * // => 12
 * ```
 */
function last<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): undefined | T | Promise<undefined | T> {
  if (isArrayOrTypedArray(iterable)) {
    return iterable[iterable.length - 1] as undefined | T;
  }
  return isSync(iterable) ? lastSync(iterable) : lastAsync(iterable);
}

function lastSync<T>(
  iterable: Iterable<T>,
): undefined | T {
  let result: undefined | T;
  for (const element of iterable) result = element;
  return result;
}

async function lastAsync<T>(
  iterable: AsyncIterable<T>,
): Promise<undefined | T> {
  let result: undefined | T;
  for await (const element of iterable) result = element;
  return result;
}
