/**
 * Returns an iterable that yields `value` `times` times. `times` is infinite by default.
 *
 * @example
 * ```typescript
 * repeat("foo");
 * // => Iterable yielding "foo", "foo", "foo", "foo"...
 *
 * repeat("hi", 3);
 * // => Iterable yielding "hi", "hi", "hi"
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

  [Symbol.iterator]() {
    return new RepeatIterator(this.#value, this.#times);
  }
}

class RepeatIterator<T> implements Iterator<T> {
  #value: T;
  #remaining: number;

  constructor(value: T, times: number) {
    this.#value = value;
    this.#remaining = times;
  }

  next(): IteratorResult<T> {
    return (this.#remaining-- > 0)
      ? { value: this.#value, done: false }
      : { value: undefined, done: true };
  }
}
