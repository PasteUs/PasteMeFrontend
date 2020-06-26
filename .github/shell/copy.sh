#!/usr/bin/env
for each in css js img
do
    eval "cp pasteme/${each}/* pasteme_cdn/pasteme/${each}/"
done