/**
 * Turn array-like objects (objects with a `length` property and indexed elements) into iterables.
 *
 * Somewhat similar to `Array.from`.
 */
export default function fromArrayLike<T>(
  arrayLike: Readonly<ArrayLike<T>>,
): Iterable<undefined | T> {
  return new FromArrayLikeIterable(arrayLike);
}

class FromArrayLikeIterable<T> implements Iterable<undefined | T> {
  #arrayLike: ArrayLike<T>;

  constructor(arrayLike: ArrayLike<T>) {
    this.#arrayLike = arrayLike;
  }

  *[Symbol.iterator]() {
    const arrayLike = this.#arrayLike;
    const { length } = arrayLike;
    for (let i = 0; i < length; i++) yield arrayLike[i];
  }
}
