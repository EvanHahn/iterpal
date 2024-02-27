import isSync from "./_isSync.ts";

export default isEmpty;

/** @ignored */
function isEmpty(iterable: Iterable<unknown>): boolean;

/** @ignored */
function isEmpty(
  iterable: AsyncIterable<unknown>,
): Promise<boolean>;

/**
 * Returns `true` if `iterable` has no elements, and `false` otherwise.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * @example
 * ```typescript
 * isEmpty(new Set());
 * // => true
 *
 * isEmpty([1, 2, 3]);
 * // => false
 * ```
 */
function isEmpty(
  iterable: Iterable<unknown> | AsyncIterable<unknown>,
): boolean | Promise<boolean> {
  return isSync(iterable)
    ? Boolean(iterable[Symbol.iterator]().next().done)
    : iterable[Symbol.asyncIterator]()
      .next()
      .then(({ done }) => Boolean(done));
}
