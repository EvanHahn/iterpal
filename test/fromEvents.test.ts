import { assert, assertEquals } from "assert";

import { fromEvents } from "../mod.ts";

Deno.test("turns an event stream into an async iterable", async () => {
  const target = new EventTarget();

  const result = fromEvents(target, "foo");

  target.dispatchEvent(new Event("ignored"));
  target.dispatchEvent(new TestEvent("foo", 1));
  target.dispatchEvent(new TestEvent("foo", 2));
  target.dispatchEvent(new TestEvent("foo", 3));
  target.dispatchEvent(new TestEvent("foo", 999));
  target.dispatchEvent(new Event("ignored"));

  const fooEvents: number[] = [];
  for await (const event of result) {
    assertEquals(event.type, "foo");
    fooEvents.push((event as TestEvent).testData);
    if (fooEvents.length >= 3) break;
  }

  assertEquals(fooEvents, [1, 2, 3]);
});

Deno.test(
  "turns a Node-style event emitter into an async iterable",
  async () => {
    const target = new NodeStyleEventEmitter();

    const result = fromEvents(target, "foo");

    target.emit("ignored");
    target.emit("foo");
    target.emit("foo", 1);
    target.emit("foo", 2, 3);
    target.emit("foo", 999);
    target.emit("ignored");

    const fooEvents: unknown[][] = [];
    for await (const args of result) {
      fooEvents.push(args);
      if (fooEvents.length >= 3) break;
    }

    assertEquals(fooEvents, [[], [1], [2, 3]]);
  },
);

class TestEvent extends Event {
  constructor(type: string, public readonly testData: number) {
    super(type);
  }
}

class NodeStyleEventEmitter {
  #listener: null | ((...args: unknown[]) => unknown) = null;

  on(eventName: string | symbol, listener: (...args: unknown[]) => unknown) {
    assertEquals(eventName, "foo", "Test only supports 'foo' event");
    assertEquals(this.#listener, null, "Test only supports one listener");
    this.#listener = listener;
  }

  off(eventName: string | symbol, listener: (...args: unknown[]) => unknown) {
    assertEquals(eventName, "foo", "Test only supports 'foo' event");
    assertEquals(
      listener,
      this.#listener,
      "Test stopped listening to the wrong thing",
    );
    this.#listener = null;
  }

  emit(eventName: string | symbol, ...args: unknown[]) {
    if (eventName !== "foo") return;
    assert(this.#listener, "Emitted without any listeners");
    this.#listener(...args);
  }
}
