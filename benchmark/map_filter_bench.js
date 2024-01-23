import map from "../map.js";
import filter from "../filter.js";

const bigArray = Array(1_000_000).fill(null).map(Math.random);

function noop() {}

Deno.bench("iterpal map and filter", () => {
  const result = map(
    filter(
      map(bigArray, (n) => n - 0.5),
      (n) => n > 0
    ),
    String
  );
  for (const value of result) {
    noop(value);
  }
});

Deno.bench("native map and filter", () => {
  const result = map(
    filter(
      map(bigArray, (n) => n - 0.5),
      (n) => n > 0
    ),
    String
  );
  for (const value of result) {
    noop(value);
  }
});
