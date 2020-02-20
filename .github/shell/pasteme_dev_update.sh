#!/usr/local/env bash
set -x && \
echo 'Start updating PasteMe dev' && \
git clone https://github.com/LucienShui/PasteMe.git -b dev PasteMeDev --recursive && \
cd PasteMeDev && \
git submodule foreach git pull origin master && \
git config user.name "Lucien Shui" && \
git config user.email "lucien@lucien.ink" && \
git add --all && \
git commit -m "Pushed by github action $(TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S')" && \
set +x && \
git push https://"${GH_TOKEN}"@github.com/LucienShui/PasteMe.git dev && \
cd ..
