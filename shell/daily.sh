#!/usr/local/env bash
set -x && \
rm -rf .git && \
git clone https://github.com/LucienShui/PasteMeFrontend.git -b dev frontend && \
mv frontend/.git ./ && \
rm -rf frontend && \
git clone https://github.com/PasteUs/CDN.git -b master --depth=1 pasteme_cdn
echo \{\"version\": \"$(cat pasteme_cdn/version.txt)\"\} > cdn.version.json && \
rm -rf pasteme_cdn
git config user.name "Lucien Shui" && \
git config user.email "lucien@lucien.ink" && \
git add --all && \
git commit -m "build from travis-ci $(TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S')" && \
set +x && \
git push https://${GH_TOKEN}@github.com/LucienShui/PasteMeFrontend.git dev
