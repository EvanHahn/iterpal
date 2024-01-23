export default <T>(iterable: Iterable<T>, amount: number): Iterable<T> =>
  new DropIterable(iterable, amount);

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
