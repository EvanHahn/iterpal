import isSync from "./_isSync.ts";

type Falsey = false | null | undefined | 0 | 0n | "";

export default compact;

/** @ignored */
function compact<T>(iterable: Iterable<Falsey | T>): Iterable<T>;

/** @ignored */
function compact<T>(iterable: AsyncIterable<Falsey | T>): AsyncIterable<T>;

/**
 * Return an iterable with all falsey values removed.
 *
 * `false`, `null`, `undefined`, `0`, `-0`, `0n`, `NaN`, `""`, and `document.all` are falsey.
 *
 * Works with sync and async iterables.
 */
function compact<T>(
  iterable: Iterable<Falsey | T> | AsyncIterable<Falsey | T>,
): Iterable<T> | AsyncIterable<T> {
  return isSync(iterable) ? compactSync(iterable) : compactAsync(iterable);
}

function* compactSync<T>(iterable: Iterable<Falsey | T>): Iterable<T> {
  for (const element of iterable) {
    if (element) yield element;
  }
}

async function* compactAsync<T>(
  iterable: AsyncIterable<Falsey | T>,
): AsyncIterable<T> {
  for await (const element of iterable) {
    if (element) yield element;
  }
}
