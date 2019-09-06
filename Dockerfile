FROM node:8 as builder
COPY ./ /source
RUN cd /source && \
npm install --registry=https://registry.npm.taobao.org && \
npm run build && \
rm -rf pasteme/conf.d pasteme/report.html

FROM nginx:1.17
LABEL maintainer="Lucien Shui" \
      email="lucien@lucien.ink"
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /source/pasteme /www/pasteme
EXPOSE 8080