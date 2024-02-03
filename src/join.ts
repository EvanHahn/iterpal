/**
 * Converts all elements in `iterable` into a string separated by `separator`.
 *
 * Like `Array.prototype.join`, `null` and `undefined` are converted to empty strings.
 *
 * @example
 * ```typescript
 * join(new Set(["hello", "world"]));
 * // => 'hello,world'
 *
 * join(new Set(["hello", "world"]), " and ");
 * // => 'hello and world'
 *
 * join([1, undefined, 2, null, 3]);
 * // => '1,,2,,3'
 * ```
 */
export default function join<T>(
  iterable: Iterable<T>,
  separator = ",",
): string {
  let hasPlacedFirstElement = false;
  let result = "";

  for (const value of iterable) {
    const stringified = value == null ? "" : String(value);
    if (hasPlacedFirstElement) {
      result += separator + stringified;
    } else {
      result += stringified;
      hasPlacedFirstElement = true;
    }
  }

  return result;
}
