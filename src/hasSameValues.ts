import isSync from "./_isSync.ts";
import quickSize from "./_quickSize.ts";

export default hasSameValues;

/** @ignored */
function hasSameValues<T>(
  iterableA: Iterable<T>,
  iterableB: Iterable<T>,
): boolean;

/** @ignored */
function hasSameValues<T>(
  iterableA: AsyncIterable<T>,
  iterableB: Iterable<T>,
): Promise<boolean>;

/** @ignored */
function hasSameValues<T>(
  iterableA: Iterable<T>,
  iterableB: AsyncIterable<T>,
): Promise<boolean>;

/** @ignored */
function hasSameValues<T>(
  iterableA: AsyncIterable<T>,
  iterableB: AsyncIterable<T>,
): Promise<boolean>;

/**
 * If `iterableA` and `iterableB` have the same lengths and values, returns `true` (order is irrelevant). Otherwise, returns `false`. Equality is determined with `Object.is`.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * @example
 * ```typescript
 * import { hasSameValues } from "iterpal";
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
function hasSameValues<T>(
  iterableA: Iterable<T> | AsyncIterable<T>,
  iterableB: Iterable<T> | AsyncIterable<T>,
): boolean | Promise<boolean> {
  return (
      isSync(iterableA) && isSync(iterableB)
    )
    ? (
      hasSameValuesSync(iterableA, iterableB)
    )
    : (
      hasSameValuesAsync(iterableA, iterableB)
    );
}

function countValuesSync<T>(iterable: Iterable<T>): Map<T, number> {
  const result = new Map<T, number>();
  for (const value of iterable) {
    result.set(value, (result.get(value) || 0) + 1);
  }
  return result;
}

async function countValuesAsync<T>(
  iterable: AsyncIterable<T>,
): Promise<Map<T, number>> {
  const result = new Map<T, number>();
  for await (const value of iterable) {
    result.set(value, (result.get(value) || 0) + 1);
  }
  return result;
}

function countValuesEither<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Map<T, number> | Promise<Map<T, number>> {
  return isSync(iterable)
    ? countValuesSync(iterable)
    : countValuesAsync(iterable);
}

function hasSameValuesSync<T>(
  iterableA: Iterable<T>,
  iterableB: Iterable<T>,
): boolean {
  // This is an optimization.
  const aSize = quickSize(iterableA);
  const bSize = quickSize(iterableB);
  if (aSize !== null && bSize !== null && aSize !== bSize) {
    return false;
  }

  const countsByValueA = countValuesSync(iterableA);
  const countsByValueB = countValuesSync(iterableB);

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

async function hasSameValuesAsync<T>(
  iterableA: Iterable<T> | AsyncIterable<T>,
  iterableB: Iterable<T> | AsyncIterable<T>,
): Promise<boolean> {
  const [countsByValueA, countsByValueB] = await Promise.all([
    countValuesEither(iterableA),
    countValuesEither(iterableB),
  ]);

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
