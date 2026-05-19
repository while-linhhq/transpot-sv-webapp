#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE="${ASSETS_SOURCE_PATH:-$ROOT/asset_img_video}"
TARGET="$ROOT/client/public/assets"

mkdir -p "$SOURCE"
mkdir -p "$(dirname "$TARGET")"

if [ -d "$TARGET" ] || [ -L "$TARGET" ]; then
  rm -rf "$TARGET"
fi

if [ -d "$SOURCE" ] && [ "$(ls -A "$SOURCE" 2>/dev/null || true)" ]; then
  ln -sfn "$SOURCE" "$TARGET"
  echo "Linked assets: $SOURCE -> $TARGET"
else
  mkdir -p "$TARGET/images" "$TARGET/videos"
  echo "Created placeholder assets at $TARGET (add files to $SOURCE and re-run)"
fi
