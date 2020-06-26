#!/usr/local/env bash
rm -rf .git && \
git clone https://github.com/PasteUs/CDN.git -b master pasteme_cdn && \
npm ci && \
npm run build --if-present && \
for each in css js img; do; eval "cp pasteme/$each/* pasteme_cdn/pasteme/$each/"; done && \
cd pasteme_cdn && \
git config user.name "Lucien Shui" && \
git config user.email "lucien@lucien.ink" && \
git add --all && \
git commit -m "Pushed by github action $(TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S')" && \
set +x && \
git push https://"${GH_TOKEN}"@github.com/PasteUs/CDN.git master && \
set -x && \
cd ..
