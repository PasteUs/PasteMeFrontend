FROM nginx:1.29
LABEL maintainer="Lucien Shui" \
      email="lucien@lucien.ink"

ENV TZ=Asia/Shanghai
COPY init.sh /temp
RUN cat /docker-entrypoint.sh >> /temp && \
    mv /temp /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

COPY /pasteme /www/pasteme
RUN mv /www/pasteme/conf.d/docker.conf /etc/nginx/conf.d/default.conf && \
    rm -rf /www/pasteme/conf.d && \
    rm -rf /www/pasteme/report.html
EXPOSE 8080
