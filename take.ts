/**
 * Returns a new iterable with `amount` elements taken from the beginning. If `amount` exceeds the number of elements, returns a copy of the whole iterable.
 *
 * @example
 * ```typescript
 * take(["hello", "to", "you!"], 2);
 * // => Iterable yielding "hello", "to"

 * take(["hello", "to", "you!"], 200);
 * // => Iterable yielding "hello", "to", "you!"
 * ```
 */
export default function <T>(
  iterable: Iterable<T>,
  amount: number,
): Iterable<T> {
  return new TakeIterable(iterable, amount);
}

class TakeIterable<T> implements Iterable<T> {
  #iterable: Iterable<T>;
  #amount: number;

  constructor(iterable: Iterable<T>, amount: number) {
    this.#iterable = iterable;
    this.#amount = amount;
  }

  [Symbol.iterator]() {
    const iterator = this.#iterable[Symbol.iterator]();
    let amount = this.#amount;

    return {
      next() {
        if (amount === 0) return { done: true } as IteratorResult<T>;

        const nextIteration = iterator.next();
        if (nextIteration.done) {
          return { done: true } as IteratorResult<T>;
        } else {
          amount--;
          return nextIteration;
        }
      },
    };
  }
}
