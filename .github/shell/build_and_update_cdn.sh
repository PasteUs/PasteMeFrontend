#!/usr/local/env bash
rm -rf .git && \
git clone https://github.com/PasteUs/CDN.git -b master pasteme_cdn && \
echo \{\"version\": \""$(cat pasteme_cdn/version.txt)"\"\} > build.config.json && \
npm ci && \
npm run build --if-present && \
rm -rf pasteme_cdn/pasteme && \
cp -r pasteme pasteme_cdn && \
cd pasteme_cdn && \
git config user.name "Lucien Shui" && \
git config user.email "lucien@lucien.ink" && \
git add --all && \
git commit -m "Pushed by github action $(TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S')" && \
set +x && \
git push https://"${GH_TOKEN}"@github.com/PasteUs/CDN.git master && \
set -x && \
cd ..
