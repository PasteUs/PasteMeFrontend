#!/usr/local/env bash
set -x && \
rm -rf .git && \
git clone https://github.com/PasteUs/CDN.git -b master pasteme_cdn && \
echo \{\"version\": \""$(cat pasteme_cdn/version.txt)"\"\} > build.config.json && \
npm run build && \
rm -rf pasteme_cdn/pasteme && \
cp -r pasteme pasteme_cdn && \
cd pasteme_cdn && \
git config user.name "${USER_NAME}" && \
git config user.email "${USER_EMAIL}" && \
git add --all && \
git commit -m "travis-ci $(TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S')" && \
set +x && \
git push https://"${GH_TOKEN}"@github.com/PasteUs/CDN.git master && \
set -x && \
cd .. && \
git clone https://github.com/LucienShui/PasteMeFrontend.git -b dist/"${TRAVIS_BRANCH}" tmpdir && \
cp -r tmpdir/.git pasteme && \
cp LICENSE DEPLOY.md dev.Dockerfile pasteme && \
cd pasteme && \
mv dev.Dockerfile Dockerfile && \
rm -rf report.html js img css && \
mv DEPLOY.md README.md && \
git config user.name "${USER_NAME}" && \
git config user.email "${USER_EMAIL}" && \
git add --all && \
git commit -m "travis-ci $(TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S')" && \
set +x && \
git push https://"${GH_TOKEN}"@github.com/LucienShui/PasteMeFrontend.git dist/"${TRAVIS_BRANCH}"
