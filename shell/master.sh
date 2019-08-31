#!/usr/local/env bash
rm -rf .git
git clone https://${GH_REF} -b ${P_BRANCH} tmpdir
cp -r tmpdir/.git pasteme
cp nginx.conf LICENSE DEPLOY.md pasteme
cd pasteme
rm report.html
mv DEPLOY.md README.md
git config user.name "${U_NAME}"
git config user.email "${U_EMAIL}"
git add --all
git commit -m "build from travis-ci `TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S'`"
git push https://${GH_TOKEN}@${GH_REF} ${P_BRANCH}
curl -X POST ${WEBHOOK}${WEBHOOK_PATH}
echo 'Start updating PasteMe dev'
git clone https://github.com/LucienShui/PasteMe.git -b dev PasteMeDev --recursive
cd PasteMeDev
git submodule foreach git pull origin master
git config user.name "${U_NAME}"
git config user.email "${U_EMAIL}"
git add --all
git commit -m "push from travis-ci `TZ=UTC-8 date +'%Y-%m-%d %H:%M:%S'`"
git push https://${GH_TOKEN}@${GH_PASTEME} dev
