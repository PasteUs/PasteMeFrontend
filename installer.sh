#!/usr/bin/env bash

if [[ ${#} != 1 ]]; then
    echo "Usage: ${0} <install|uninstall|upgrade>"
else
    set -x
    if [[ ${1} == "install" ]]; then
        /usr/bin/env bash "${0}" uninstall && \
        git clone --depth=1 https://github.com/LucienShui/PasteMeFrontend.git -b build /usr/local/pasteme && \
        cd /usr/local/pasteme && \
        mkdir -p /etc/pasteme && \
        if ! ln -s "${PWD}"/usr "${PWD}"/conf.d /etc/pasteme
        then
            echo -e "\033[31mInstallation failed\033[0m"
        else
            echo -e "\033[32mInstallation finished\033[0m"
            echo "Config file: /etc/pasteme/config.json"
            echo "Nginx config file: /etc/pasteme/conf.d/nginx.conf"
        fi
    elif [[ ${1} == "uninstall" ]]; then
        rm -rf /usr/local/pasteme
        rm -rf /etc/pasteme
        echo "uninstall finished"
    elif [[ ${1} == "upgrade" ]]; then
        cd /usr/local/pasteme && \
        git pull
    else
        echo "[ERROR] unsupported operation: ${1}"
    fi
fi
