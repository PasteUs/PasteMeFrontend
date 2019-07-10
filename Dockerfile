FROM node:latest as builder
COPY ./ /source
RUN cd /source && npm install --registry=https://registry.npm.taobao.org && npm run build && rm -rf pasteme/conf.d

FROM nginx:latest
MAINTAINER lucien@lucien.ink
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /source/pasteme /www/pasteme
EXPOSE 8080