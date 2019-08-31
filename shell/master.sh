#!/usr/local/env bash
set -x && \
rm -rf .git && \
git clone https://github.com/PasteUs/CDN.git -b master pasteme_cdn && \
sed -e "s/href=\//href=https:\/\/cdn.jsdelivr.net\/gh\/PasteUs\/CDN@$(cat pasteme_cdn/version.txt)\/pasteme\//g" pasteme/index.html > buffer.html && \
mv buffer.html pasteme/index.html && \
rm -rf pasteme_cdn/pasteme && \
cp -r pasteme pasteme_cdn && \
cd pasteme_cdn && \
git config user.name "Lucien Shui" && \
git config user.email "lucien@lucien.ink" && \
git add --all && \
git commit -m "build from travis-ci `TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S'`" && \
set +x && \
git push https://${GH_TOKEN}@github.com/PasteUs/CDN.git master && \
set -x && \
cd .. && \
git clone https://github.com/LucienShui/PasteMeFrontend.git -b build tmpdir && \
cp -r tmpdir/.git pasteme && \
cp LICENSE DEPLOY.md pasteme && \
cd pasteme && \
rm report.html && \
mv DEPLOY.md README.md && \
git config user.name "Lucien Shui" && \
git config user.email "lucien@lucien.ink" && \
git add --all && \
git commit -m "build from travis-ci `TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S'`" && \
set +x && \
git push https://${GH_TOKEN}@github.com/LucienShui/PasteMeFrontend.git build && \
set -x && \
curl -X POST ${WEBHOOK}${WEBHOOK_PATH} && \
echo 'Start updating PasteMe dev' && \
git clone https://github.com/LucienShui/PasteMe.git -b dev PasteMeDev --recursive && \
cd PasteMeDev && \
git submodule foreach git pull origin master && \
git config user.name "Lucien Shui" && \
git config user.email "lucien@lucien.ink" && \
git add --all && \
git commit -m "push from travis-ci `TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S'`" && \
set +x && \
git push https://${GH_TOKEN}@github.com/LucienShui/PasteMe.git dev
