class EmptyAsyncIterable implements AsyncIterable<never> {
  [Symbol.asyncIterator](): AsyncIterator<never> {
    return new EmptyAsyncIterator();
  }
}

class EmptyAsyncIterator implements AsyncIterator<never> {
  next(): Promise<IteratorResult<never>> {
    return Promise.resolve({ done: true, value: undefined });
  }
}

/**
 * An empty async iterable.
 */
const emptyAsyncIterable = new EmptyAsyncIterable();

export default emptyAsyncIterable;
