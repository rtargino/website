#!/usr/bin/env bash
set -e

# Always run from the repository root, wherever the script is called from
cd "$(dirname "$0")"

# The venv's Python lives in .venv/bin on Linux/macOS and .venv/Scripts on Windows
find_venv_python() {
  for p in .venv/bin/python .venv/Scripts/python.exe; do
    if [ -x "$p" ]; then
      echo "$p"
      return 0
    fi
  done
  return 1
}

if ! VENV_PY=$(find_venv_python); then
  echo "No .venv found, creating one..."
  # python3 first (Ubuntu); on Windows python3 may be a Microsoft Store stub that fails, so fall back to python
  for cmd in python3 python; do
    if "$cmd" -c 'import sys' >/dev/null 2>&1; then
      "$cmd" -m venv .venv
      break
    fi
  done
  VENV_PY=$(find_venv_python) || { echo "Could not create .venv: no working Python found" >&2; exit 1; }
fi

"$VENV_PY" -m pip install -r ./src/requirements.txt
"$VENV_PY" ./src/bibtex_processor.py

Rscript -e 'pandoc::pandoc_activate(); rmarkdown::render("./src/RodrigoSTarginoCV.Rmd")'
mv src/RodrigoSTarginoCV.pdf static/author_data/RodrigoSTarginoCV.pdf
