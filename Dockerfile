FROM nginx:1.18-alpine
LABEL maintainer="Lucien Shui" \
      email="lucien@lucien.ink"

COPY init.sh /temp
RUN cat /docker-entrypoint.sh >> /temp && \
    mv /temp /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

COPY public/conf.d/docker.conf pasteme/index.html pasteme/usr pasteme/favicon.ico /pasteme_tmp/
RUN mv /pasteme_tmp/docker.conf /etc/nginx/conf.d/default.conf && \
    mkdir -p /www/pasteme/usr && \
    mv /pasteme_tmp/index.html /pasteme_tmp/favicon.ico /www/pasteme/ && \
    mv /pasteme_tmp/config.example.json /config.example.json && \
    rm -rf /pasteme_tmp
EXPOSE 8080
