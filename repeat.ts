export default <T>(value: T, times = Infinity): Iterable<T> =>
  new RepeatIterable(value, times);

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
