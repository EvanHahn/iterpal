import quickSize from "./_quickSize.ts";
import isSync from "./_isSync.ts";
import at from "./at.ts";
import arrayFrom from "./arrayFrom.ts";

export default sample;

/** @ignored */
function sample<T>(iterable: Iterable<T>): undefined | T;

/** @ignored */
function sample<T>(iterable: AsyncIterable<T>): Promise<undefined | T>;

/**
 * Get a random element from `iterable`.
 *
 * May have to iterate over the whole iterable and store it in memory. Has optimizations for some types, such as arrays, to avoid this. Don't count on this behavior, as it is only an optimization.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * @example
 * ```typescript
 * const mySet = new Set([9, 8, 7]);
 * sample(mySet);
 * // => 7
 * sample(mySet);
 * // => 8
 *
 * sample([]);
 * // => undefined
 * ```
 */
function sample<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): undefined | T | Promise<undefined | T> {
  if (!isSync(iterable)) return sampleAsync(iterable);

  const knownSize = quickSize(iterable);
  if (knownSize) {
    const index = Math.floor(Math.random() * knownSize);
    return at(iterable as Iterable<T>, index);
  }

  return sampleSync(iterable);
}

function sampleArrayLike<T>(arrayLike: ArrayLike<T>): undefined | T {
  const index = Math.floor(Math.random() * arrayLike.length);
  return arrayLike[index];
}

function sampleSync<T>(iterable: Iterable<T>): undefined | T {
  return sampleArrayLike(Array.from(iterable));
}

async function sampleAsync<T>(
  iterable: AsyncIterable<T>,
): Promise<undefined | T> {
  return sampleArrayLike(await arrayFrom(iterable));
}
