import asyncQueue from "./asyncQueue.ts";
import asyncify from "./asyncify.ts";

type Interval = ReturnType<typeof setInterval>;

const registry = new FinalizationRegistry((interval: Interval) => {
  clearInterval(interval);
});

/**
 * Creates an async iterable that emits a value every `delay` milliseconds.
 *
 * @example
 * ```typescript
 * for await (const value of fromInterval(1000)) {
 *   console.log(value);
 * }
 * // Logs 0, 1, 2, 3, 4...
 * ```
 */
export default function fromInterval(delay: number): AsyncIterable<number> {
  const queue = asyncQueue<number>();

  let n = 0;
  const interval = setInterval(() => {
    queue.push(n);
    n++;
  }, delay);

  // Hide the queue from the user.
  const result = asyncify(queue);

  registry.register(result, interval);

  return result;
}
