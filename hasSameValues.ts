import quickSize from "./_quickSize.ts";

const countValues = <T>(iterable: Iterable<T>): Map<T, number> => {
  const result = new Map<T, number>();
  for (const value of iterable) {
    result.set(value, (result.get(value) || 0) + 1);
  }
  return result;
};

/**
 * If `iterableA` and `iterableB` have the same lengths and values, returns `true` (order is irrelevant). Otherwise, returns `false`. Equality is determined with `Object.is`.
 *
 * @example
 * ```typescript
 * const hasSameValues = require("iterpal/hasSameValues");
 *
 * hasSameValues([9, 8, 7], [7, 8, 9]);
 * // => true
 *
 * hasSameValues([9, 8, 7], [9, 10, 11]);
 * // => false
 *
 * hasSameValues([9, 8, 7], new Set([7, 9, 8]));
 * // => true
 *
 * hasSameValues([], new Set([]));
 * // => true
 * ```
 */
export default function hasSameValues<T>(
  iterableA: Iterable<T>,
  iterableB: Iterable<T>,
): boolean {
  const aSize = quickSize(iterableA);
  const bSize = quickSize(iterableB);
  if (aSize !== null && bSize !== null && aSize !== bSize) {
    return false;
  }

  const countsByValueA = countValues(iterableA);
  const countsByValueB = countValues(iterableB);

  if (countsByValueA.size !== countsByValueB.size) {
    return false;
  }

  for (const [value, expectedCount] of countsByValueA) {
    if (countsByValueB.get(value) !== expectedCount) {
      return false;
    }
  }

  return true;
}
