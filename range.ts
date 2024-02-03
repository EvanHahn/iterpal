export default range;

const validateNumber = (value: number): void => {
  if (!Number.isSafeInteger(value)) {
    throw new Error("range received unexpected number");
  }
};

const numberRange = (start: number, finish: number, step: number) => {
  validateNumber(start);
  validateNumber(finish);
  if (step === 0) throw new Error("range cannot have a zero step");
  validateNumber(step);
  return new RangeIterable(start, finish, step);
};

const bigintRange = (start: bigint, finish: bigint, step: bigint) => {
  if (step === 0n) throw new Error("range cannot have a zero step");
  return new RangeIterable(start, finish, step);
};

/** @ignored */
function range(finish: number): Iterable<number>;
/** @ignored */
function range(finish: bigint): Iterable<number>;
/** @ignored */
function range(start: number, finish: number, step?: number): Iterable<number>;
/** @ignored */
function range(start: bigint, finish: bigint, step?: bigint): Iterable<bigint>;

/**
 * Counts between `start` and `finish` by `step`. All values must be integers.
 *
 * Similar to Python's `range` function.
 *
 * @example
 * ```typescript
 * [...range(3)];
 * // => [0, 1, 2]
 *
 * [...range(1, 3)];
 * // => [1, 2]
 *
 * [...range(1n, 3n)];
 * // => [1n, 2n]
 *
 * [...range(1, 3, 3)];
 * // => [1, 4, 7]
 *
 * [...range(7, 1, -2)];
 * // => [7, 5, 3]
 * ```
 */
function range(
  startOrFinish: number | bigint,
  finish?: number | bigint,
  step?: number | bigint,
): Iterable<number | bigint> {
  if (finish === undefined) {
    return typeof startOrFinish === "number"
      ? numberRange(0, startOrFinish, 1)
      : bigintRange(0n, startOrFinish, 1n);
  }

  return typeof startOrFinish === "number"
    ? numberRange(startOrFinish, finish as number, (step ?? 1) as number)
    : bigintRange(startOrFinish, finish as bigint, (step ?? 1n) as bigint);
}

class RangeIterable<T extends number | bigint> implements Iterable<T> {
  #start: T;
  #finish: T;
  #step: T;

  constructor(start: T, finish: T, step: T) {
    this.#start = start;
    this.#finish = finish;
    this.#step = step;
  }

  *[Symbol.iterator]() {
    const start = this.#start;
    const finish = this.#finish;
    // I can't figure out a way to avoid this `any` without gymnastics.
    // Contributions welcome!
    // deno-lint-ignore no-explicit-any
    const step = this.#step as any;

    if (step < 0) {
      for (let i = start; i > finish; i += step) yield i;
    } else {
      for (let i = start; i < finish; i += step) yield i;
    }
  }
}
