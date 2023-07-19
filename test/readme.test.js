import test from "ava";

import fs from "fs";
import path from "path";
import { promisify } from "util";
import map from "../map.js";
import filter from "../filter.js";
import some from "../some.js";

const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);

test.before(async (t) => {
  // TODO: This should use import.meta.url
  const readmePath = path.join("README.md");
  const readmeData = await readFileAsync(readmePath, "utf8");
  t.context.readmeLines = readmeData.split("\n").map((line) => line.trim());
});

test.before(async (t) => {
  // TODO: This should use import.meta.url
  const projectRootPath = path.join(".");
  const projectRootFiles = await readdirAsync(projectRootPath);
  const projectRootJsFiles = filter(
    projectRootFiles,
    (filename) => path.extname(filename) === ".js",
  );
  t.context.expectedFunctions = map(projectRootJsFiles, (filename) =>
    path.basename(filename, ".js"),
  );
});

test("documents all functions", (t) => {
  const summaryLines = filter(t.context.readmeLines, (line) =>
    /^<summary><code>[^<]+<\/code><\/summary>$/.test(line),
  );
  const codeInSummary = map(
    summaryLines,
    (line) => /^<summary><code>([^<]+)<\/code><\/summary>$/.exec(line)[1],
  );

  for (const expectedFunction of t.context.expectedFunctions) {
    t.assert(
      some(codeInSummary, (code) => code.startsWith(expectedFunction + "(")),
      `Expected "${expectedFunction}" to be documented`,
    );
  }
});
