export default function range(start = 0, finish = Infinity) {
  return new RangeIterable(start, finish);
}

class RangeIterable {
  constructor(start, finish) {
    Object.defineProperties(this, {
      _start: { value: start },
      _finish: { value: finish },
    });
  }

  *[Symbol.iterator]() {
    const start = this._start;
    const finish = this._finish;

    for (let i = start; i < finish; i++) {
      yield i;
    }
  }
}
