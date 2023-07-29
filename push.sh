#!/bin/bash
# origin=origin ./push.sh
# use this to push to prod
set -e
if [[ $origin == '' ]]; then
    origin='test'
fi
if [[ $origin != 'test' ]]; then
    git push "$origin" pages:pages
    exit 0
fi
git checkout master
pnpm run build
git checkout pages
rm -rf static asset-manifest.json index.html robots.txt images assets
cp -r dist/* .
git add .
git commit -m "update new version $(date +"%Y-%m-%d %T %Z")"
# Deploy on test server first
git push "$origin" pages
git checkout master
# Run this next: `git push origin pages:pages`
