type MapFn<T, V> = (value: T) => V | Promise<V>;

export default <T, V>(
  asyncIterable: AsyncIterable<T>,
  fn: MapFn<T, V>,
): AsyncIterable<V> => new AsyncMapIterable(asyncIterable, fn);

class AsyncMapIterable<T, V> implements AsyncIterable<V> {
  #iterable: AsyncIterable<T>;
  #fn: MapFn<T, V>;

  constructor(iterable: AsyncIterable<T>, fn: MapFn<T, V>) {
    this.#iterable = iterable;
    this.#fn = fn;
  }

  [Symbol.asyncIterator](): AsyncIterator<V> {
    return new AsyncMapIterator(
      this.#iterable[Symbol.asyncIterator](),
      this.#fn,
    );
  }
}

class AsyncMapIterator<T, V> implements AsyncIterator<V> {
  #iterator: AsyncIterator<T>;
  #fn: MapFn<T, V>;

  constructor(iterator: AsyncIterator<T>, fn: MapFn<T, V>) {
    this.#iterator = iterator;
    this.#fn = fn;
  }

  async next() {
    const nextIteration = await this.#iterator.next();
    if (nextIteration.done) return nextIteration;
    return { done: false, value: await this.#fn(nextIteration.value) };
  }
}
