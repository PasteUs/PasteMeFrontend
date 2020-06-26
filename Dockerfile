FROM nginx:1.17
LABEL maintainer="Lucien Shui" \
      email="lucien@lucien.ink"
COPY public/conf.d/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY pasteme /www/pasteme
RUN mv /www/pasteme/usr/config.example.json /www/pasteme/usr/config.json
EXPOSE 8080