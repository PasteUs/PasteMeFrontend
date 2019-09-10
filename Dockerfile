FROM alpine/git:1.0.7 as builder
ENV REPO="github.com/LucienShui/PasteMeFrontend.git" \
    BRANCH="dist/master"
RUN rm -rf /dist && \
    git clone "https://${REPO}" -b ${BRANCH} --depth=1 /dist

FROM nginx:1.17
LABEL maintainer="Lucien Shui" \
      email="lucien@lucien.ink"
COPY --from=builder /dist/conf.d/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /dist/index.html /dist/usr /dist/favicon.ico /www/pasteme/
EXPOSE 8080