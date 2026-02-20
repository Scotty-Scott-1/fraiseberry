#!/usr/bin/env bash
# update.sh — pull latest images and restart containers
# Run this as a cron job on your server, e.g. every 5 minutes:
#   */5 * * * * /path/to/fraiseberry/scripts/update.sh >> /var/log/fraiseberry-update.log 2>&1

set -euo pipefail

COMPOSE_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting update..."

cd "$COMPOSE_DIR"

# Pull latest code (gets updated docker-compose.yml if changed)
git pull --ff-only

# Pull new images from ghcr.io
docker compose pull

# Restart only containers whose image changed, leave others running
docker compose up -d --remove-orphans

# Clean up dangling images to free disk space
docker image prune -f

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Done."
