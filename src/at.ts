import isArrayOrTypedArray from "./_isArrayOrTypedArray.ts";
import isSync from "./_isSync.ts";

// This number is somewhat arbitrary but was fast on my machine.
// A more empirical choice would likely be better!
const MAX_SLIDING_WINDOW_EXTRA = 2 ** 15;

export default at;

/** @ignored */
function at<T>(
  iterable: Iterable<T>,
  desiredIndex: number,
): undefined | T;

/** @ignored */
function at<T>(
  iterable: AsyncIterable<T>,
  desiredIndex: number,
): Promise<undefined | T>;

/**
 * Returns the nth element from an iterable. Returns `undefined` if the index is out of range.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise for the result.
 *
 * If the index is negative, it will count from the end of the iterable. This requires exhausting the iterable and keeping at least `Math.abs(desiredIndex)` entries in memory.
 *
 * Has optimizations for some types, such as arrays, to avoid iterating over the whole argument. Don't count on this behavior, as it is only an optimization.
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
function at<T>(
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
  const iterator = iterable[Symbol.iterator]();
  return desiredIndex >= 0
    ? atSyncForward(iterator, desiredIndex)
    : atSyncBackward(iterator, -desiredIndex);
}

function atSyncForward<T>(
  iterator: Iterator<T>,
  desiredIndex: number,
): undefined | T {
  for (let i = 0; i <= desiredIndex; i++) {
    const iteration = iterator.next();
    if (i === desiredIndex) return iteration.value;
    if (iteration.done) break;
  }
  return;
}

function atSyncBackward<T>(
  iterator: Iterator<T>,
  desiredIndexFromEnd: number,
): undefined | T {
  const slidingWindow = new SlidingWindow<T>(desiredIndexFromEnd);
  while (true) {
    const iteration = iterator.next();
    if (iteration.done) break;
    slidingWindow.push(iteration.value);
  }
  return slidingWindow.fromEnd(desiredIndexFromEnd);
}

function atAsync<T>(
  iterable: AsyncIterable<T>,
  desiredIndex: number,
): Promise<undefined | T> {
  const iterator = iterable[Symbol.asyncIterator]();
  return desiredIndex >= 0
    ? atAsyncForward(iterator, desiredIndex)
    : atAsyncBackward(iterator, -desiredIndex);
}

async function atAsyncForward<T>(
  iterator: AsyncIterator<T>,
  desiredIndex: number,
): Promise<undefined | T> {
  for (let i = 0; i <= desiredIndex; i++) {
    const iteration = await iterator.next();
    if (i === desiredIndex) return iteration.value;
    if (iteration.done) break;
  }
  return;
}

async function atAsyncBackward<T>(
  iterator: AsyncIterator<T>,
  desiredIndexFromEnd: number,
): Promise<undefined | T> {
  const slidingWindow = new SlidingWindow<T>(desiredIndexFromEnd);
  while (true) {
    const iteration = await iterator.next();
    if (iteration.done) break;
    slidingWindow.push(iteration.value);
  }
  return slidingWindow.fromEnd(desiredIndexFromEnd);
}

class SlidingWindow<T> {
  #size: number;
  #arr = new Array<T>();

  constructor(size: number) {
    this.#size = size;
  }

  push(value: T) {
    if (this.#arr.length === (this.#size + MAX_SLIDING_WINDOW_EXTRA)) {
      this.#arr.splice(0, MAX_SLIDING_WINDOW_EXTRA);
    }
    this.#arr.push(value);
  }

  fromEnd(index: number) {
    return this.#arr.at(-index);
  }
}
