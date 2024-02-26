import asyncQueue from "./asyncQueue.ts";
import asyncify from "./asyncify.ts";

export default fromEvents;

export type EventTargetLike = Pick<
  EventTarget,
  "addEventListener" | "removeEventListener"
>;

export type EventEmitterLike = {
  on(
    eventName: string | symbol,
    listener: (...args: unknown[]) => unknown,
  ): unknown;
  off(
    eventName: string | symbol,
    listener: (...args: unknown[]) => unknown,
  ): unknown;
  emit(eventName: string | symbol, ...args: unknown[]): unknown;
};

const registry = new FinalizationRegistry((cleanup: () => unknown) => {
  cleanup();
});

/** @ignored */
function fromEvents(
  target: EventTargetLike,
  type: string,
): AsyncIterable<Event>;
/** @ignored */
function fromEvents(
  emitter: EventEmitterLike,
  eventName: string | symbol,
): AsyncIterable<unknown[]>;

/**
 * Convert events into an async iterable.
 *
 * Can be used with DOM-style `EventTarget` (e.g., `addEventListener` and `removeEventListener`) or Node-style event emitters (e.g., `on` and `off`). If the emitter supports both styles, the `EventTarget` style is preferred.
 *
 * When the result is garbage collected, the event listener is eventually removed.
 *
 * @example
 * ```javascript
 * for await (const event of fromEvents(el, "click")) {
 *   console.log("clicked!", event);
 * }
 * ```
 */
function fromEvents(
  emitter: EventTargetLike | EventEmitterLike,
  eventName: string | symbol,
): AsyncIterable<Event> | AsyncIterable<unknown[]> {
  if ("addEventListener" in emitter) {
    if (typeof eventName !== "string") {
      throw new TypeError("Cannot listen to symbol events on EventTargets");
    }
    return fromEventTargetEvents(emitter, eventName);
  } else {
    return fromEventEmitterEvents(emitter, eventName);
  }
}

function fromEventTargetEvents(
  target: EventTargetLike,
  type: string,
): AsyncIterable<Event> {
  const queue = asyncQueue<Event>();

  const listener = (event: Event) => {
    queue.push(event);
  };

  target.addEventListener(type, listener);

  // Hide the queue from the user.
  const result = asyncify(queue);

  registry.register(result, () => {
    target.addEventListener(type, listener);
  });

  return result;
}

function fromEventEmitterEvents(
  emitter: EventEmitterLike,
  eventName: string | symbol,
): AsyncIterable<unknown[]> {
  const queue = asyncQueue<unknown[]>();

  const listener = (...args: unknown[]) => {
    queue.push(args);
  };

  emitter.on(eventName, listener);

  // Hide the queue from the user.
  const result = asyncify(queue);

  registry.register(result, () => {
    emitter.on(eventName, listener);
  });

  return result;
}
