#!/usr/local/env bash
set -x && \
echo 'Start updating PasteMe dev' && \
git clone https://github.com/LucienShui/PasteMe.git -b dev PasteMeDev --recursive && \
cd PasteMeDev && \
git submodule foreach git pull origin master && \
git config user.name "${USER_NAME}" && \
git config user.email "${USER_EMAIL}" && \
git add --all && \
git commit -m "push from travis-ci $(TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S')" && \
set +x && \
git push https://$((GH_TOKEN))@github.com/LucienShui/PasteMe.git dev
