#!/usr/local/env bash
set -x && \
npm install && \
npm run build && \
rm -rf .git && \
git clone https://github.com/PasteUs/CDN.git -b master tmpdir && \
rm -rf tmpdir/pasteme && \
cp -r pasteme tmpdir && \
cd tmpdir && \
git config user.name "Lucien Shui" && \
git config user.email "lucien@lucien.ink" && \
git add --all && \
git commit -m "build from travis-ci `TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S'`" && \
set +x && \
git push https://${GH_TOKEN}@github.com/PasteUs/CDN.git master
