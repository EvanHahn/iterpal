import time from "./time.js";

import map from "../map.js";

const bigSet = new Set();
for (let i = 0; i < 1000000; i++) {
  bigSet.add(Math.random());
}

function noop() {}

time("mapping over a Set using iterpal map", () => {
  for (const value of map(bigSet, String)) {
    noop(value);
  }
});
