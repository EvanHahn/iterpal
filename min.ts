/**
 * Returns the smallest number in the iterable `numbers`. Returns `undefined` if `numbers` is an empty iterable. `numbers` can contain numbers or bigints.
 *
 * @example
 * ```typescript
 * min(new Set([9, 3, 1]));
 * // => 1
 *
 * min([-Infinity, 1, 2]);
 * // => -Infinity
 * ```
 */
export default function min<T extends number | bigint>(
  numbers: Iterable<T>,
): undefined | T {
  let result: undefined | T;
  for (const number of numbers) {
    if (result === undefined || result > number) {
      result = number;
    }
  }
  return result;
}
