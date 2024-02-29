import quickSize from "./_quickSize.ts";
import isSync from "./_isSync.ts";

export default size;

/** @ignored */
function size(iterable: Iterable<unknown>): number;

/** @ignored */
function size(iterable: AsyncIterable<unknown>): Promise<number>;

/**
 * Iterates over the argument to determine how many elements are inside.
 *
 * Has optimizations for some types, such as arrays, to avoid iterating over the whole argument. Don't count on this behavior, as it is only an optimization.
 *
 * For strings, this function may return a different result than the string's `length` property. This is because `length` counts the number of UTF-16 code units and iterating counts the number of Unicode code points, which can be different.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * @example
 * ```typescript
 * const myArray = ["hello", "world"];
 * myArray.length === size(myArray);
 * // => true
 *
 * const myString = "🌍";
 * myString.length === size(myString);
 * // => false
 *
 * const mySet = new Set(["oh", "hello", "there"]);
 * mySet.size === size(mySet);
 * // => true
 *
 * const myCustomIterable = {
 *   *[Symbol.iterator]() {
 *     yield "oh";
 *     yield "yeah";
 *   },
 * };
 * size(myCustomIterable);
 * // => 2
 * ```
 */
function size(
  iterable: Iterable<unknown> | AsyncIterable<unknown>,
): number | Promise<number> {
  const quick = quickSize(iterable);
  if (quick !== null) return quick;

  return isSync(iterable) ? sizeSync(iterable) : sizeAsync(iterable);
}

function sizeSync(iterable: Iterable<unknown>): number {
  const iterator = iterable[Symbol.iterator]();
  let result = -1;
  for (let isDone: unknown = false; !isDone; result++) {
    isDone = iterator.next().done;
  }
  return result;
}

async function sizeAsync(iterable: AsyncIterable<unknown>): Promise<number> {
  const iterator = iterable[Symbol.asyncIterator]();
  let result = -1;
  for (let isDone: unknown = false; !isDone; result++) {
    isDone = (await iterator.next()).done;
  }
  return result;
}
