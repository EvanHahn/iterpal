export default function objectHas(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
