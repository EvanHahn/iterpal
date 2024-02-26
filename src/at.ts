import isArrayOrTypedArray from "./_isArrayOrTypedArray.ts";
import isSync from "./_isSync.ts";

/**
 * Returns the nth element from an iterable. Returns `undefined` if the index is out of range.
 *
 * Works with sync and async iterables.
 *
 * @example
 * ```typescript
 * at(new Set(["hello", "world"]), 0);
 * // => "hello"
 *
 * at(["hello", "world"], 1);
 * // => "world"
 *
 * at(new Set(["hello", "world"]), 2);
 * // => undefined
 * ```
 */

export default function at<T>(
  iterable: Iterable<T>,
  desiredIndex: number
): undefined | T;

export default function at<T>(
  iterable: AsyncIterable<T>,
  desiredIndex: number
): Promise<undefined | T>;

export default function at<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  desiredIndex: number
): undefined | T | Promise<undefined | T> {
  if (isArrayOrTypedArray(iterable)) {
    return (iterable as Record<number, T>)[desiredIndex];
  }
  return isSync(iterable)
    ? atSync(iterable, desiredIndex)
    : atAsync(iterable, desiredIndex);
}

function atSync<T>(iterable: Iterable<T>, desiredIndex: number): undefined | T {
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
  desiredIndex: number
): Promise<undefined | T> {
  const iterator = iterable[Symbol.asyncIterator]();
  for (let i = 0; i <= desiredIndex; i++) {
    const iteration = await iterator.next();
    if (i === desiredIndex) return iteration.value;
    if (iteration.done) break;
  }
  return;
}
