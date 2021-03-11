#!/usr/bin/env sh

USER_JS_PATH="/www/pasteme/usr/usr.js"
CONFIG_PATH="/www/pasteme/usr/config.json"
EXAMPLE_CONFIG_PATH="/config.example.json"

if [ ! -f "${USER_JS_PATH}" ]; then
	echo 'console.log("This is a log defined by user")' > /www/pasteme/usr/usr.js
fi

# 如果配置文件不存在，就使用默认配置
if [ ! -f "${CONFIG_PATH}" ]; then
  cp ${EXAMPLE_CONFIG_PATH} ${CONFIG_PATH}
fi
