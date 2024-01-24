type TypedArray =
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | BigUint64Array
  | Int8Array
  | Int16Array
  | Int32Array
  | BigInt64Array
  | Float32Array
  | Float64Array;

export default (value: unknown): value is Array<unknown> | TypedArray => (
  Array.isArray(value) ||
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
);
