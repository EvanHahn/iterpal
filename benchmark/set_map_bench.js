import map from "../map.ts";

const bigSet = new Set();
for (let i = 0; i < 1_000_000; i++) {
  bigSet.add(Math.random());
}

function noop() {}

Deno.bench("iterpal map over set", () => {
  for (const value of map(bigSet, String)) {
    noop(value);
  }
});

Deno.bench("native convert to array, then map", () => {
  for (const value of [...bigSet].map(String)) {
    noop(value);
  }
});

Deno.bench("native for of", () => {
  const result = [];
  for (const value of bigSet) {
    result.push(String(value));
  }

  for (const value of result) {
    noop(value);
  }
});
