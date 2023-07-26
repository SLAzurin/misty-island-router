#!/bin/bash
set -e
git checkout master
pnpm run build
git checkout pages
rm -rf static asset-manifest.json index.html robots.txt images assets
cp -r dist/* .
git add .
git commit -m "update new version $(date +"%Y-%m-%d %T %Z")"
# Deploy on test server first
git push test pages
git checkout master
# Run this next: `git push origin pages:pages`
