#!/usr/bin/env bash
set -euo pipefail

# run.sh — create venv if missing, install deps, and run the app
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if [ ! -d ".venv" ]; then
  python3 -m venv .venv
  echo "Created .venv"
fi

source .venv/bin/activate
pip install -r requirements.txt
python src/app.py