/**
 * An async queue. You shouldn't construct this directly and should instead use `asyncQueue`.
 *
 * You can push values onto the queue and pull them out later. If you pull before a value is pushed, the pull will wait until a value is pushed.
 *
 * @example
 * ```typescript
 * // Pushing, then pulling
 * queue.push(1);
 * queue.push(2);
 * await queue.next();
 * // => { done: false, value: 1 }
 * await queue.next();
 * // => { done: false, value: 2 }
 *
 * // Pulling, then pushing
 * const pullA = queue.next();
 * const pullB = queue.next();
 * queue.push(3);
 * queue.push(4);
 * await pullA;
 * // => { done: false, value: 3 }
 * await pullB;
 * // => { done: false, value: 4 }
 * ```
 */
export class AsyncQueue<T> implements AsyncIterableIterator<T> {
  #queue: Array<{
    promise: Promise<T>;
    resolve: (value: T) => unknown;
    isResolved: boolean;
  }> = [];
  #pushPointer = 0;
  #pullPointer = 0;

  /**
   * Push a value onto the queue.
   */
  push(value: T) {
    this.#fillQueue(this.#pushPointer + 1);

    const queueItem = this.#queue[this.#pushPointer];
    if (!queueItem || queueItem.isResolved) {
      throw new Error("AsyncQueue bug: invalid queue item on push");
    }
    queueItem.resolve(value);

    this.#pushPointer++;
  }

  /**
   * Pull a value off of the queue in the iterator style.
   */
  async next(): Promise<IteratorResult<T, void>> {
    this.#fillQueue(this.#pullPointer + 1);

    const queueItem = this.#queue[this.#pullPointer];
    if (!queueItem) {
      throw new Error("AsyncQueue bug: missing queue item on pull");
    }

    this.#pullPointer++;

    const value = await queueItem.promise;
    queueItem.isResolved = true;

    this.#cleanQueue();

    return { done: false, value };
  }

  /**
   * This queue instance.
   */
  [Symbol.asyncIterator](): this {
    return this;
  }

  #fillQueue(toSize: number) {
    while (this.#queue.length < toSize) {
      this.#queue.push({ ...Promise.withResolvers<T>(), isResolved: false });
    }
  }

  #cleanQueue() {
    let countOfItemsToClean: number;
    for (
      countOfItemsToClean = 0;
      countOfItemsToClean < this.#queue.length;
      countOfItemsToClean++
    ) {
      const queueItem = this.#queue[countOfItemsToClean];
      if (!queueItem) {
        throw new Error("AsyncQueue bug: missing queue item on clean");
      }
      if (!queueItem.isResolved) break;
    }

    this.#queue.splice(0, countOfItemsToClean);
    this.#pushPointer -= countOfItemsToClean;
    this.#pullPointer -= countOfItemsToClean;
  }
}

/**
 * Create an async queue.
 *
 * You can push values onto the queue and pull them out later. If you pull before a value is pushed, the pull will wait until a value is pushed.
 *
 * @example
 * ```typescript
 * const queue = asyncQueue<number>();
 *
 * // Pushing, then pulling
 * queue.push(1);
 * queue.push(2);
 * await queue.next();
 * // => { done: false, value: 1 }
 * await queue.next();
 * // => { done: false, value: 2 }
 *
 * // Pulling, then pushing
 * const pullA = queue.next();
 * const pullB = queue.next();
 * queue.push(3);
 * queue.push(4);
 * await pullA;
 * // => { done: false, value: 3 }
 * await pullB;
 * // => { done: false, value: 4 }
 * ```
 */
export default function asyncQueue<T>(): AsyncQueue<T> {
  return new AsyncQueue();
}
