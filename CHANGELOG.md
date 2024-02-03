# Changelog

## Unreleased

### Added

- TypeScript type definitions
- Deno support
- Documentation
- `cycle`
- `hasSameValues`
- `isEmpty`
- `last`
- `repeatedly`

### Changed

- Asyncify now takes either sync or async iterables
- **Breaking:** `range` now works like Python's `range`
- **Breaking:** `zip` now stops after the shortest iterable

### Removed

- **Breaking:** Dropped support for old Node versions. Node 18+ is now required
- **Breaking:** `jsonStringify`
- **Breaking:** `objectEntries`
- **Breaking:** `objectKeys`
- **Breaking:** `objectValues`
- **Breaking:** `fibonacci`
- **Breaking:** `objectHas`

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
