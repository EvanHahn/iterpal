import isArrayOrTypedArray from "./_isArrayOrTypedArray.ts";

/**
 * Iterates over `iterable`, returning the final value. Returns `undefined` if the iterable is empty.
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
export default function last<T>(iterable: Iterable<T>): undefined | T {
  // This is an optimization.
  if (isArrayOrTypedArray(iterable)) {
    return iterable[iterable.length - 1] as undefined | T;
  }

  let result: undefined | T;
  for (const element of iterable) {
    result = element;
  }
  return result;
}
