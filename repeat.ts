/**
 * Returns an iterable that yields `value` `times` times. `times` is infinite by default.
 *
 * @example
 * ```typescript
 * repeat("foo");
 * // => Iterable yielding 'foo', 'foo', 'foo', 'foo'...
 *
 * repeat("hi", 3);
 * // => Iterable yielding 'hi', 'hi', 'hi'
 * ```
 */
export default function repeat<T>(value: T, times = Infinity): Iterable<T> {
  return new RepeatIterable(value, times);
}

class RepeatIterable<T> implements Iterable<T> {
  #value: T;
  #times: number;

  constructor(value: T, times: number) {
    this.#value = value;
    this.#times = times;
  }

  *[Symbol.iterator]() {
    const value = this.#value;
    const times = this.#times;

    for (let i = 0; i < times; i++) yield value;
  }
}
