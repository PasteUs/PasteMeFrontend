FROM nginx:1.17
LABEL maintainer="Lucien Shui" \
      email="lucien@lucien.ink"
COPY public/conf.d/docker/nginx.conf pasteme/index.html pasteme/usr pasteme/favicon.ico /tmp/
RUN mv /tmp/nginx.conf /etc/nginx/conf.d/default.conf && \
    mkdir -p /www/pasteme && \
    mv /tmp/index.html /tmp/usr /tmp/favicon.ico /www/pasteme/
EXPOSE 8080