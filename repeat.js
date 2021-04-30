export default function repeat(value, times = Infinity) {
  return new RepeatIterator(value, times);
}

class RepeatIterator {
  constructor(value, times) {
    Object.defineProperties(this, {
      _value: { value },
      _times: { value: times },
    });
  }

  *[Symbol.iterator]() {
    const value = this._value;
    const times = this._times;

    for (let i = 0; i < times; i++) {
      yield value;
    }
  }
}
