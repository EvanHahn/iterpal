import isArrayOrTypedArray from "./_isArrayOrTypedArray.ts";
import isSync from "./_isSync.ts";
import asyncIterableToArray from "./asyncIterableToArray.ts";

/** @ignored */
export default function at<T>(
  iterable: Iterable<T>,
  desiredIndex: number,
): undefined | T;

/** @ignored */
export default function at<T>(
  iterable: AsyncIterable<T>,
  desiredIndex: number,
): Promise<undefined | T>;

/**
 * Returns the nth element from an iterable. Returns `undefined` if the index is out of range.
 *
 * If the index is negative, it will count from the end of the iterable. This usually requires materializing the entire iterable.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * @example
 * ```typescript
 * at(new Set(["hello", "world"]), 0);
 * // => "hello"
 *
 * at(["hello", "world"], 1);
 * // => "world"
 *
 * at("abc", -2);
 * // => "b"
 *
 * at(new Set(["hello", "world"]), 2);
 * // => undefined
 * ```
 */
export default function at<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  desiredIndex: number,
): undefined | T | Promise<undefined | T> {
  if (isArrayOrTypedArray(iterable)) {
    return (iterable as Array<T>).at(desiredIndex);
  }
  return isSync(iterable)
    ? atSync(iterable, desiredIndex)
    : atAsync(iterable, desiredIndex);
}

function atSync<T>(iterable: Iterable<T>, desiredIndex: number): undefined | T {
  if (desiredIndex < 0) return at(Array.from(iterable), desiredIndex);

  const iterator = iterable[Symbol.iterator]();
  for (let i = 0; i <= desiredIndex; i++) {
    const iteration = iterator.next();
    if (i === desiredIndex) return iteration.value;
    if (iteration.done) break;
  }
  return;
}

async function atAsync<T>(
  iterable: AsyncIterable<T>,
  desiredIndex: number,
): Promise<undefined | T> {
  if (desiredIndex < 0) {
    return at(await asyncIterableToArray(iterable), desiredIndex);
  }

  const iterator = iterable[Symbol.asyncIterator]();
  for (let i = 0; i <= desiredIndex; i++) {
    const iteration = await iterator.next();
    if (i === desiredIndex) return iteration.value;
    if (iteration.done) break;
  }
  return;
}
