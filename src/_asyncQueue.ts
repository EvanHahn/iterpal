export default class AsyncQueue<T> implements AsyncIterator<T> {
  #queue: Array<{
    promise: Promise<T>;
    resolve: (value: T) => unknown;
    isResolved: boolean;
  }> = [];
  #pushPointer = 0;
  #pullPointer = 0;

  push(value: T) {
    this.#fillQueue(this.#pushPointer + 1);

    const queueItem = this.#queue[this.#pushPointer];
    if (!queueItem || queueItem.isResolved) {
      throw new Error("AsyncQueue bug: invalid queue item on push");
    }
    queueItem.resolve(value);

    this.#pushPointer++;
  }

  async next(): Promise<IteratorResult<T>> {
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
