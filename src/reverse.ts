import isSync from "./_isSync.ts";
import isArrayOrTypedArray from "./_isArrayOrTypedArray.ts";
import asyncIterableToArray from "./asyncIterableToArray.ts";

/** @ignored */
export default function reverse<T>(iterable: Iterable<T>): Iterable<T>;

/** @ignored */
export default function reverse<T>(
  iterable: AsyncIterable<T>,
): AsyncIterable<T>;

/**
 * Reverse an iterable.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * Typically needs to "materialize" the iterable into an array to reverse it, so this is not suitable for infinite iterables.
 *
 * @example
 * ```typescript
 * const myArray = [1, 2, 3];
 *
 * reverse(myArray);
 * // => Iterable yielding 3, 2, 1
 * ```
 */
export default function reverse<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Iterable<T> | AsyncIterable<T> {
  return isSync(iterable) ? reverseSync(iterable) : reverseAsync(iterable);
}

function reverseSync<T>(iterable: Iterable<T>): Iterable<T> {
  return isArrayOrTypedArray(iterable)
    ? (iterable.slice().reverse() as Iterable<T>)
    : Array.from(iterable).reverse();
}

async function* reverseAsync<T>(iterable: AsyncIterable<T>): AsyncIterable<T> {
  const materialized = await asyncIterableToArray(iterable);
  yield* reverse(materialized);
}
