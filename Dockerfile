FROM nginx:1.17
LABEL maintainer="Lucien Shui" \
      email="lucien@lucien.ink"
COPY ./ /www/pasteme
RUN rm -rf /etc/nginx/conf.d/default.conf && mv /www/pasteme/conf.d/docker /etc/nginx/conf.d/default.conf
EXPOSE 8080