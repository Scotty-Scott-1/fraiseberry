#!/usr/bin/env bash

set -euo pipefail

COMPOSE_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting update..."

cd "$COMPOSE_DIR"

# Pull latest code
git pull --ff-only

# Pull latest images from ghcr.io (frontend + backend)
docker compose pull

# Restart everything
docker compose up -d --remove-orphans

# Free disk space
docker image prune -f

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Done."
