import isSync from "./_isSync.ts";

export default first;

/** @ignored */
function first<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): undefined | T;

/** @ignored */
function first<T>(
  iterable: AsyncIterable<T>,
): Promise<undefined | T>;

/**
 * Returns the first value in an iterable. Returns `undefined` if the iterable is empty.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * @example
 * ```typescript
 * first(new Set(["hello", "world"]));
 * // => "hello"
 *
 * first([10, 11, 12]);
 * // => 10
 *
 * first(new Map());
 * // => undefined
 * ```
 */
function first<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): undefined | T | Promise<undefined | T> {
  return isSync(iterable)
    ? iterable[Symbol.iterator]().next().value
    : iterable[Symbol.asyncIterator]()
      .next()
      .then((result) => result.value);
}
