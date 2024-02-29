import { at } from "../mod.ts";

function* numbers() {
  for (let i = 0; i <= 1_000_000; i++) yield i;
}

Deno.bench("negative at", () => {
  const index = -Math.ceil(Math.random() * 1_000_000);
  at(numbers(), index);
});
