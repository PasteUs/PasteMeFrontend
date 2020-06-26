#!/usr/bin/env bash
for each in css js img
do
    eval "cp pasteme/${each}/* pasteme_cdn/pasteme/${each}/"
done