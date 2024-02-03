import { filter, map } from "../mod.ts";
import { noop } from "./helpers.ts";

const bigArray = Array(1_000_000).fill(null).map(Math.random);

Deno.bench("iterpal map and filter", () => {
  const result = map(
    filter(
      map(bigArray, (n) => n - 0.5),
      (n) => n > 0,
    ),
    String,
  );
  for (const value of result) {
    noop(value);
  }
});

Deno.bench("native map and filter", () => {
  const result = map(
    filter(
      map(bigArray, (n) => n - 0.5),
      (n) => n > 0,
    ),
    String,
  );
  for (const value of result) {
    noop(value);
  }
});
