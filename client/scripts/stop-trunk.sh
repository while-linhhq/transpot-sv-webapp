#!/usr/bin/env bash
# Trunk + Next dev cùng lúc dễ OOM → máy treo/reboot (đặc biệt máy ~8–16GB RAM)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

if [ -d "$ROOT/.trunk" ]; then
  echo "⚠️  Phát hiện $ROOT/.trunk — Trunk quét repo rất nặng."
  echo "   → Cursor: Extensions → Trunk → Disable/Uninstall"
  rm -rf "$ROOT/.trunk"
  echo "   → Đã xóa .trunk/ (extension có thể tạo lại khi mở project)"
fi

pkill -f "trunk.*transpot-sv-webapp" 2>/dev/null || true
pkill -f "/home/hl0812/.cache/trunk.*transport-sv-webapp" 2>/dev/null || true

if pgrep -af "trunk.*transpot-sv-webapp" >/dev/null 2>&1; then
  echo "⚠️  Vẫn còn process Trunk — hãy Disable extension Trunk rồi Reload Window."
fi
