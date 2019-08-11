#!/usr/bin/env bash
set -e
set -u
set -o pipefail

for file in *.benchmark.js; do
  /usr/bin/time --format 'used %M kilobytes' node "$file"
  echo
done
