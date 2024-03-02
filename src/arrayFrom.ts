import isSync from "./_isSync.ts";

export default arrayFrom;

/** @ignored */
function arrayFrom<T>(iterable: Iterable<T>): Array<T>;

/** @ignored */
function arrayFrom<T>(
  iterable: AsyncIterable<T>,
): Promise<Array<T>>;

/**
 * Convert an iterable to an array.
 *
 * Similar to `Array.from`.
 *
 * If passed a sync iterable, returns an array. If passed an async iterable, returns a Promise that resolves to an array.
 *
 * @example
 * ```typescript
 * const res = await fetch("/foo.txt");
 *
 * const arr = await arrayFrom(res.body);
 * // => [Uint8Array(123), Uint8Array(456), ...]
 * ```
 */
function arrayFrom<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Array<T> | Promise<Array<T>> {
  return isSync(iterable) ? Array.from(iterable) : arrayFromAsync(iterable);
}

async function arrayFromAsync<T>(
  iterable: AsyncIterable<T>,
): Promise<Array<T>> {
  const result = [];
  for await (const value of iterable) result.push(value);
  return result;
}
