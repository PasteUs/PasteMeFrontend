#!/usr/local/env bash
set -x && \
rm -rf .git && \
git clone https://github.com/LucienShui/PasteMeFrontend.git -b dev frontend && \
cd frontend && \
echo '{"version": "$(curl -Ls https://raw.githubusercontent.com/PasteUs/CDN/master/version.txt)"}' > cdn.version.json && \
git config user.name "Lucien Shui" && \
git config user.email "lucien@lucien.ink" && \
git add --all && \
git commit -m "build from travis-ci `TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S'`" && \
set +x && \
git push https://${GH_TOKEN}@github.com/LucienShui/PasteMeFrontend.git master
