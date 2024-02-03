/**
 * Reduces `iterable` to a single value. On each iteration, calls `fn` with the result so far (starting at `accumulator`) and the current value.
 *
 * Similar to `Array.prototype.reduce`.
 *
 * @example
 * ```javascript
 * reduce(numbers, (total, n) => total + n, 0);
 * // => 1234
 * ```
 */
export default function reduce<T, U>(
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
