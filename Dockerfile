FROM nginx:1.17
LABEL maintainer="Lucien Shui" \
      email="lucien@lucien.ink"
COPY public/conf.d/docker/nginx.conf pasteme/index.html pasteme/usr pasteme/favicon.ico /tmp/
RUN mv /tmp/nginx.conf /etc/nginx/conf.d/default.conf && \
    mkdir -p /www/pasteme/usr && \
    mv /tmp/index.html /tmp/favicon.ico /www/pasteme/ && \
    mv /tmp/config.example.json /www/pasteme/usr/config.json && \
    mv /tmp/usr.js /www/pasteme/usr/
EXPOSE 8080