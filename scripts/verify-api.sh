#!/usr/bin/env bash
set -euo pipefail

API="${API_URL:-http://localhost:4000/api/v1}"

echo "==> Health"
curl -sf "$API/health" | head -c 200
echo ""

echo "==> Projects (published)"
curl -sf "$API/projects?status=PUBLISHED&limit=3" | head -c 400
echo ""

echo "==> Login"
TOKEN=$(curl -sf -X POST "$API/auth/login" \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@vanchuyenledat.vn","password":"Admin@123456"}' \
  | node -e "const d=JSON.parse(require('fs').readFileSync(0,'utf8')); process.stdout.write(d.data?.accessToken||'')")

if [ -z "$TOKEN" ]; then
  echo "LOGIN FAILED"
  exit 1
fi
echo "Login OK"

echo "==> All checks passed"
