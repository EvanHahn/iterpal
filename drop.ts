/**
 * Returns an iterable with the first `amount` elements removed.
 *
 * @example
 * ```typescript
 * drop(new Set(["hello", "to", "the", "world!"]), 2);
 * // => Iterable yielding 'the', 'world'
 *
 * drop(new Set(["hello", "to", "the", "world!"]), 4);
 * // => Empty iterable
 * ```
 */
export default function drop<T>(
  iterable: Iterable<T>,
  amount: number,
): Iterable<T> {
  return new DropIterable(iterable, amount);
}

class DropIterable<T> implements Iterable<T> {
  #iterable: Iterable<T>;
  #amount: number;

  constructor(iterable: Iterable<T>, amount: number) {
    this.#iterable = iterable;
    this.#amount = amount;
  }

  [Symbol.iterator]() {
    const iterator = this.#iterable[Symbol.iterator]();
    const amount = this.#amount;

    let hasDropped = false;
    return {
      next() {
        if (!hasDropped) {
          for (let i = 0; i < amount; i++) {
            iterator.next();
          }
          hasDropped = true;
        }
        return iterator.next();
      },
    };
  }
}
