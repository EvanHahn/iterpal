import time from "./time.js";

import size from "../size.js";
import objectKeys from "../objectKeys.js";

const bigObject = {};
for (let i = 0; i < 5000000; i++) {
  bigObject[Math.random()] = i;
}

function noop() {}

time("iterpal object size", () => {
  noop(size(objectKeys(bigObject)).toString());
});
