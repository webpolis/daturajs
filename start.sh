#!/bin/bash
if [ -z "${APP_UNCOMMON_WWW_PORT}" ]; then export APP_UNCOMMON_WWW_PORT=3333; fi
if [ -z "${APP_UNCOMMON_REST_PORT}" ]; then export APP_UNCOMMON_REST_PORT=3339; fi

node ./app.js