# Misty Island Router

This app calculates how many raw materials are needed for each craftable thingy.

Getting started as a dev:
```
npm i -g pnpm
pnpm i
pnpm run dev
pnpm run build
```

Deploying to pages:
```
pnpm run build
git checkout pages
rm -rf static asset-manifest.json index.html robots.txt images assets
cp -r dist/* .
git add .
git commit -m "update new version $(date +"%Y-%m-%d %T %Z")"
git push origin pages
```