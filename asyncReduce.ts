/**
 * Reduces `asyncIterable` to a single value. On each iteration, calls `fn` with the result so far (starting at `accumulator`) and the current value. If `fn` returns a `Promise`, it is awaited.
 *
 * Similar to `Array.prototype.reduce`.
 *
 * @example
 * ```javascript
 * await asyncReduce(
 *   jsonPayloadIterableFromServer,
 *   (total, obj) => total + obj.count,
 *   0
 * );
 * // => 1234
 * ```
 */
export default async function asyncReduce<T, U>(
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
