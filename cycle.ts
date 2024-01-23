export default <T>(iterable: Iterable<T>): Iterable<T> =>
  new CycleIterable(iterable);

class CycleIterable<T> implements Iterable<T> {
  #iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.#iterable = iterable;
  }

  [Symbol.iterator]() {
    const iterable = this.#iterable;
    let iterator = iterable[Symbol.iterator]();

    return {
      next() {
        let nextIteration = iterator.next();

        if (nextIteration.done) {
          iterator = iterable[Symbol.iterator]();
          nextIteration = iterator.next();
          if (nextIteration.done) {
            throw new Error("Cannot cycle an empty iterable");
          }
        }

        return nextIteration;
      },
    };
  }
}
