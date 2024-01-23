export default <T>(iterable: Iterable<T>) => new AsyncifyIterable(iterable);

class AsyncifyIterable<T> implements AsyncIterable<T> {
  #iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.#iterable = iterable;
  }

  [Symbol.asyncIterator]() {
    const iterator = this.#iterable[Symbol.iterator]();
    return {
      next() {
        return Promise.resolve(iterator.next());
      },
    };
  }
}
