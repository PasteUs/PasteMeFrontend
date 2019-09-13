#!/usr/local/env bash
set -x && \
rm -rf .git && \
git clone https://github.com/PasteUs/pasteus.github.io.git -b master git_page && \
cp index.html git_page/ && \
echo -e '---\npermalink: /404.html\n---\n\n'"$(cat index.html)" > git_page/404.html && \
cd git_page && \
git config user.name "${USER_NAME}" && \
git config user.email "${USER_EMAIL}" && \
git add --all && \
git commit -m "travis-ci $(TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S')" && \
set +x && \
git push https://"${GH_TOKEN}"@github.com/PasteUs/pasteus.github.io.git master
