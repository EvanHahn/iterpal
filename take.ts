export default <T>(iterable: Iterable<T>, amount: number): Iterable<T> =>
  new TakeIterable(iterable, amount);

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
        const nextIteration = iterator.next();
        if (nextIteration.done || amount === 0) {
          return { done: true } as IteratorResult<T>;
        } else {
          amount--;
          return nextIteration;
        }
      },
    };
  }
}
