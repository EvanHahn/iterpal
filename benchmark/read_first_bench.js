import map from "../map.ts";

const bigArray = Array(1_000_000).fill(null).map(Math.random);

function noop() {}

Deno.bench("iterpal read first", () => {
  for (const value of map(bigArray, String)) {
    return value;
  }
});

Deno.bench("native read first", () => {
  for (const value of bigArray.map(String)) {
    return value;
  }
});

Deno.bench("iterpal read first 100", () => {
  let count = 0;
  for (const value of map(bigArray, String)) {
    count++;
    noop(value);
    if (count === 100) break;
    noop(value);
  }
});

Deno.bench("native read first 100", () => {
  let count = 0;
  for (const value of bigArray.map(String)) {
    count++;
    if (count === 100) break;
    noop(value);
  }
});
