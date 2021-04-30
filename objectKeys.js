import objectHas from "./objectHas.js";

export default function objectKeys(obj) {
  return new ObjectKeysIterable(obj);
}

class ObjectKeysIterable {
  constructor(obj) {
    Object.defineProperty(this, "_obj", { value: obj });
  }

  *[Symbol.iterator]() {
    const obj = this._obj;

    for (const key in obj) {
      if (objectHas(obj, key)) {
        yield key;
      }
    }
  }
}
