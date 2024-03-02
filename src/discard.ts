export default discard;

/** @ignored */
function discard(iterator: Iterator<unknown>): void;

/** @ignored */
function discard(iterator: AsyncIterator<unknown>): Promise<void>;

/**
 * Call `next()` on an iterable until it's done, discarding the results. Useful when you want to exhaust an iterable.
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
function discard(
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
