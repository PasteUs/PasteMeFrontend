FROM nginx:1.17
LABEL maintainer="Lucien Shui" \
      email="lucien@lucien.ink"
COPY public/conf.d/docker/nginx.conf pasteme/index.html pasteme/usr pasteme/favicon.ico /pasteme_tmp/
RUN mv /pasteme_tmp/nginx.conf /etc/nginx/conf.d/default.conf && \
    mkdir -p /www/pasteme/usr && \
    mv /pasteme_tmp/index.html /pasteme_tmp/favicon.ico /www/pasteme/ && \
    mv /pasteme_tmp/config.example.json /www/pasteme/usr/config.json && \
    mv /pasteme_tmp/usr.js /www/pasteme/usr/ && \
    rm -rf /pasteme_tmp
EXPOSE 8080
