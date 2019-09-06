FROM byrnedo/alpine-curl:0.1 as builder
ENV DOMAIN="raw.githubusercontent.com" \
    REPO="LucienShui/PasteMeFrontend" \
    BRANCH="dist/master"
RUN curl -Ls "https://${DOMAIN}/${REPO}/${BRANCH}/index.html" > /index.html && \
    curl -Ls "https://${DOMAIN}/${REPO}/${BRANCH}/conf.d/docker/nginx.conf" > /default.conf

FROM nginx:1.17
LABEL maintainer="Lucien Shui" \
      email="lucien@lucien.ink"
COPY --from=builder /default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /index.html /www/pasteme/
EXPOSE 8080