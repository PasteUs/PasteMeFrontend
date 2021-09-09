# PasteMe Frontend

[![CI](https://github.com/PasteUs/PasteMeFrontend/actions/workflows/ci.yml/badge.svg)](https://github.com/PasteUs/PasteMeFrontend/actions/workflows/ci.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/PasteUs/PasteMeFrontend?color=white&label=latest&sort=semver)](https://github.com/PasteUs/PasteMeFrontend/releases)
[![Docker Image Version (latest semver)](https://img.shields.io/docker/v/pasteme/frontend?label=Docker%20Hub&sort=semver)](https://hub.docker.com/r/pasteme/frontend)

> From version 3.3.0, PasteMe Frontend uses hash router instead of history router, and is incompatible with PasteMe Go Backend version before 3.4.0

Using Vue 2 and Bootstrap-Vue.

## Project setup

```bash
npm install
cp public/usr/config.example.json public/usr/config.json
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Run your tests

```bash
npm run test
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Deployment

[Deploy Document](./DEPLOY.md)

## Non-unit testing

1. Create & access permanent paste
2. Create & access temporary paste
3. Create temporary with custom paste key
4. Create & access permanent paste with password

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions |
