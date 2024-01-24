/**
 * Turns an asynchronous iterable (such as a stream) into an array. Returns a `Promise` that resolves to an array.
 *
 * @example
 * ```typescript
 * const res = await fetch("/foo.txt");
 *
 * const arr = await asyncIterableToArray(res.body);
 * // => [Uint8Array(123), Uint8Array(456), ...]
 * ```
 */
export default async function asyncIterableToArray<T>(
  asyncIterable: AsyncIterable<T>,
): Promise<Array<T>> {
  const result = [];
  for await (const value of asyncIterable) {
    result.push(value);
  }
  return result;
}
