export default <T>(iterables: Iterable<Iterable<T>>): Iterable<T> =>
  new ConcatIterable(iterables);

class ConcatIterable<T> implements Iterable<T> {
  #iterables: Iterable<Iterable<T>>;

  constructor(iterables: Iterable<Iterable<T>>) {
    this.#iterables = iterables;
  }

  *[Symbol.iterator]() {
    for (const iterable of this.#iterables) {
      for (const value of iterable) {
        yield value;
      }
    }
  }
}
