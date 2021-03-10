#!/usr/bin/env sh

if [ ! -f "/www/pasteme/usr/usr.js" ]; then
	echo 'console.log("This is a log defined by user")' > /www/pasteme/usr/usr.js
fi