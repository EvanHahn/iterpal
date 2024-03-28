/**
 * Start counting. Starts at `count` (which defaults to 0) and goes up by `step` (which defaults to 1) each time.
 *
 * @example
 * ```typescript
 * count(10, 5);
 * // => Iterable yielding 10, 15, 20, 25, ...
 *
 * count(3);
 * // => Iterable yielding 3, 4, 5, 6, ...
 *
 * count();
 * // => Iterable yielding 0, 1, 2, 3, ...
 * ```
 */
export default function* count(
  start = 0,
  step = 1,
): Iterable<number> {
  for (let i = start; true; i += step) yield i;
}
