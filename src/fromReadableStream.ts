/**
 * Turn `ReadableStream`s into async iterables.
 *
 * @example
 * ```typescript
 * const stream = new ReadableStream({
 *   start(controller) {
 *     controller.enqueue(1);
 *     controller.enqueue(2);
 *     controller.enqueue(3);
 *     controller.close();
 *   },
 * });
 *
 * const asyncIterable = fromReadableStream(stream);
 * for await (const value of asyncIterable) {
 *   console.log(value);
 * }
 * // => 1
 * // => 2
 * // => 3
 */
export default function fromReadableStream<T>(
  stream: ReadableStream<T>,
): AsyncIterable<T> {
  return new FromReadableStreamAsyncIterable(stream);
}

class FromReadableStreamAsyncIterable<T> implements AsyncIterable<T> {
  #stream: ReadableStream<T>;

  constructor(stream: ReadableStream<T>) {
    this.#stream = stream;
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return new FromReadableStreamAsyncIterator(this.#stream.getReader());
  }
}

class FromReadableStreamAsyncIterator<T> implements AsyncIterator<T> {
  #reader: ReadableStreamDefaultReader<T>;

  constructor(reader: ReadableStreamDefaultReader<T>) {
    this.#reader = reader;
  }

  async next(): Promise<IteratorResult<T>> {
    const { done, value } = await this.#reader.read();
    if (done) {
      await this.#reader.cancel();
      this.#reader.releaseLock();
      return { done: true, value: undefined };
    } else {
      return { done: false, value };
    }
  }
}
