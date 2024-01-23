const getLength = (value: Readonly<unknown>): null | number =>
  Array.isArray(value) ||
    typeof value === "string" ||
    value instanceof Uint8Array ||
    value instanceof Uint8ClampedArray ||
    value instanceof Uint16Array ||
    value instanceof Uint32Array ||
    value instanceof BigUint64Array ||
    value instanceof Int8Array ||
    value instanceof Int16Array ||
    value instanceof Int32Array ||
    value instanceof BigInt64Array ||
    value instanceof Float32Array ||
    value instanceof Float64Array
    ? value.length
    : null;

const getSize = (value: Readonly<unknown>): null | number =>
  value instanceof Set || value instanceof Map ? value.size : null;

export default (iterable: Readonly<unknown>): null | number =>
  getLength(iterable) ?? getSize(iterable) ?? null;
