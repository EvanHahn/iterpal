#!/usr/bin/env bash
set -e
set -u
set -o pipefail

for file in *.benchmark.js; do
  node "$file"
done
