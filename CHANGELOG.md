# Changelog

## Unreleased

### Added

- `compact`
- `cycle` now supports async iterables
- `drop` now supports async iterables
- `every` now supports async iterables
- `find` now supports async iterables
- `forEach`
- `fromArrayLike`
- `last` now supports async iterables
- `promiseRace`
- `setFrom`
- `size` now supports async iterables
- `some` now supports async iterables
- `uniq`

## 0.3.0 - 2024-02-27

### Added

- TypeScript type definitions
- Deno support
- Deno-style API documentation
- `asyncQueue`
- `cycle`
- `emptyAsyncIterable`
- `discard`
- `fromEvents`
- `fromInterval`
- `hasSameValues`
- `isEmpty`
- `last`
- `promiseAll`
- `repeatedly`
- `reverse`
- `takeWhile`

### Changed

- Many functions now support sync and async iterables
- `at` should now be slightly faster for some types
- **Breaking:** `range` now works like Python's `range`
- **Breaking:** `zip` now stops after the shortest iterable
- **Breaking:** `asyncIterableToArray` renamed to `arrayFrom`

### Removed

- **Breaking:** Dropped support for old Node versions. Node 18+ is now required
- **Breaking:** `asyncMap` (folded into `map`)
- **Breaking:** `asyncReduce` (folded into `reduce`)
- **Breaking:** `fibonacci`
- **Breaking:** `jsonStringify`
- **Breaking:** `objectEntries`
- **Breaking:** `objectHas`
- **Breaking:** `objectKeys`
- **Breaking:** `objectValues`

## 0.2.0 - 2019-05-27

### Added

- `asyncify`
- `asyncIterableToArray`
- `asyncMap`
- `asyncReduce`
- `drop`
- `fibonacci`
- `jsonStringify`
- `max`
- `min`
- `objectHas`
- `objectKeys`
- `objectValues`
- `primes`
- `size`
- `take`
- `zip`
- Additional package metadata (homepage, repository, keywords, bugs)

### Changed

- `concat` now takes an iterable of iterables
- All functions returning iterables now return class instances
- Documentation
- License is now MIT, to be more permissive

## 0.1.0 - 2019-05-07

### Added

- `at`
- `concat`
- `every`
- `filter`
- `find`
- `first`
- `join`
- `map`
- `objectEntries`
- `range`
- `reduce`
- `repeat`
- `some`
