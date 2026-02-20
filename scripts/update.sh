#!/usr/bin/env bash
# update.sh — pull latest images and restart containers
# Run this as a cron job on your server, e.g. every 5 minutes:
#   */5 * * * * /path/to/fraiseberry/scripts/update.sh >> /var/log/fraiseberry-update.log 2>&1

set -euo pipefail

COMPOSE_DIR="$(cd "$(dirname "$0")/.." && pwd)"

export $(grep -v '^#' "$COMPOSE_DIR/.env" | xargs)

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting update..."

cd "$COMPOSE_DIR"

# Pull latest code
git pull --ff-only

# Pull latest images from ghcr.io (frontend + backend)
docker compose pull

# Restart everything
docker compose up -d --remove-orphans

# Clean up dangling images to free disk space
docker image prune -f

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Done."
