#!/usr/bin/env bash
#
# download-images.sh — fetch images referenced by the migrated MDX posts
# from the live WordPress site into public/images/.
#
# Run from the astro-site/ project root while adminschoice.com is still live:
#   bash download-images.sh
#
# Safe to re-run: present files are skipped. Uses image-url-map.tsv for exact
# fast lookups; falls back to probing year folders for anything not mapped.

set -uo pipefail

BASE_URL="https://www.adminschoice.com/wp-content/uploads"
DEST="public/images"
POSTS_DIR="src/content/posts"
MAP_FILE="image-url-map.tsv"
UA="Mozilla/5.0 (compatible; AdminsChoiceMigration/1.0)"
YEARS="2009 2010 2011 2012 2013 2014 2015 2016 2017 2018 2019 2020 2021 2022 2023 2024 2025 2026"

mkdir -p "$DEST"
ok=0; skip=0; fail=0; dead=0
FAILED_LIST="$DEST/_failed-downloads.txt"
: > "$FAILED_LIST"

declare -A URL_MAP
if [[ -f "$MAP_FILE" ]]; then
  while IFS=$'\t' read -r fname url; do
    [[ -n "$fname" ]] && URL_MAP["$fname"]="$url"
  done < "$MAP_FILE"
  echo "Loaded ${#URL_MAP[@]} known image URLs from $MAP_FILE"
else
  echo "Note: $MAP_FILE not found — will probe year folders (slower)."
fi
echo ""

mapfile -t IMAGES < <(grep -rhoE '/images/[A-Za-z0-9._-]+\.(png|jpg|jpeg|gif|webp|svg)' "$POSTS_DIR" 2>/dev/null \
  | sed 's|/images/||' | sort -u)
echo "Found ${#IMAGES[@]} unique image filenames referenced in posts."
echo ""

try_url() {
  local url="$1" out="$2"
  if curl -fsSL --max-time 20 -A "$UA" -o "$out" "$url" 2>/dev/null; then
    if [[ -s "$out" ]] && file "$out" 2>/dev/null | grep -qiE 'image|bitmap'; then
      return 0
    fi
    rm -f "$out"
  fi
  return 1
}

fetch_one() {
  local fname="$1" out="$DEST/$1"
  [[ -s "$out" ]] && { skip=$((skip+1)); return 0; }

  if [[ "$fname" =~ ^[0-9]{9}_[0-9]+_[0-9]+\.jpg$ ]]; then
    echo "  SKIP (dead widget): $fname"; dead=$((dead+1)); return 0
  fi

  if [[ -n "${URL_MAP[$fname]:-}" ]]; then
    if try_url "${URL_MAP[$fname]}" "$out"; then
      echo "  OK   $fname"; ok=$((ok+1)); return 0
    fi
  fi

  local ext base stripped
  ext="${fname##*.}"; base="${fname%.*}"
  stripped="$(printf '%s' "$base" | sed -E 's/-[0-9]+x[0-9]+$//').$ext"
  if [[ "$stripped" != "$fname" && -n "${URL_MAP[$stripped]:-}" ]]; then
    if try_url "${URL_MAP[$stripped]}" "$out"; then
      echo "  OK   $fname (via $stripped)"; ok=$((ok+1)); return 0
    fi
  fi

  local y m
  for y in $YEARS; do
    for m in 01 02 03 04 05 06 07 08 09 10 11 12; do
      if try_url "$BASE_URL/$y/$m/$fname" "$out"; then
        echo "  OK   $fname (probed $y/$m)"; ok=$((ok+1)); return 0
      fi
    done
  done

  echo "  FAIL $fname"
  echo "$fname" >> "$FAILED_LIST"
  fail=$((fail+1)); return 1
}

for img in "${IMAGES[@]}"; do
  fetch_one "$img"
done

echo ""
echo "========================================"
echo "  Downloaded : $ok"
echo "  Skipped    : $skip (already present)"
echo "  Dead links : $dead (widget images, intentionally skipped)"
echo "  Failed     : $fail"
echo "========================================"
if [[ "$fail" -gt 0 ]]; then
  echo ""
  echo "Failed files are listed in $FAILED_LIST"
  echo "Retrieve these manually via FTP from /wp-content/uploads/,"
  echo "or remove the image reference from the post if no longer needed."
fi
