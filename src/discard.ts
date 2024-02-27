/** @ignored */
export default function discard(iterator: Iterator<unknown>): void;

/** @ignored */
export default function discard(
  iterator: AsyncIterator<unknown>,
): Promise<void>;

/**
 * Call `next()` on an iterable until it's done, discarding the results.
 *
 * Works with sync and async iterables. If passed an async iterable, returns a Promise.
 *
 * @example
 * ```typescript
 * const myIterator = [1, 2, 3][Symbol.iterator]();
 *
 * discard(myIterator);
 *
 * myIterator.next().done;
 * // => true
 * ```
 */
export default function discard(
  iterator: Iterator<unknown> | AsyncIterator<unknown>,
): void | Promise<void> {
  const firstIteration = iterator.next();
  if ("then" in firstIteration) {
    return firstIteration.then(async ({ done }) => {
      while (!done) {
        ({ done } = await iterator.next());
      }
    });
  } else {
    let { done } = firstIteration;
    while (!done) {
      ({ done } = (iterator as Iterator<unknown>).next());
    }
  }
}
