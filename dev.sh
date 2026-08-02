#!/usr/bin/env bash
# Start the PM Dashboard Vite dev server on port 5174.
set -e
cd "$(dirname "$0")"
exec npm run dev -- --port 5174
