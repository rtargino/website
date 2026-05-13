#!/usr/bin/env bash
set -e

git add .

git diff --cached --quiet || git commit -m "Automatic update of CV files"

git push
