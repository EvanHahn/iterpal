import { build, emptyDir } from "@deno/dnt";

await emptyDir("./dist/npm");

await build({
  entryPoints: ["./mod.ts"],
  testPattern: "/dev/null",
  outDir: "./dist/npm",
  shims: { deno: "dev" },
  typeCheck: "both",
  package: {
    name: "iterpal",
    author: "Evan Hahn <me@evanhahn.com> (https://evanhahn.com)",
    description: "iterable tools",
    version: "0.4.0",
    license: "MIT",
    keywords: ["iterator", "iterable", "generator", "stream"],
    homepage: "https://codeberg.org/EvanHahn/iterpal",
    repository: {
      type: "git",
      url: "https://codeberg.org/EvanHahn/iterpal.git",
    },
    bugs: {
      url: "https://codeberg.org/EvanHahn/iterpal/issues",
      email: "me@evanhahn.com",
    },
    engines: {
      node: ">=18.0.0",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE.txt", "./dist/npm/LICENSE.txt");
    Deno.copyFileSync("README.md", "./dist/npm/README.md");
    Deno.copyFileSync("CHANGELOG.md", "./dist/npm/CHANGELOG.md");
  },
});
