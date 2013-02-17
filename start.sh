#!/bin/bash
PORT_WWW=$1
PORT_REST=$2

if [ $PORT_WWW ]
    then export APP_UNCOMMON_WWW_PORT=$PORT_WWW;
fi
if [ $PORT_REST ]
    then export APP_UNCOMMON_REST_PORT=$PORT_REST;
fi

if [ -z "${APP_UNCOMMON_WWW_PORT}" ]; then export APP_UNCOMMON_WWW_PORT=80; fi
if [ -z "${APP_UNCOMMON_REST_PORT}" ]; then export APP_UNCOMMON_REST_PORT=3339; fi

if [ -e "/usr/local/bin/nodemon" ];
    then
        nodemon --debug ./app.js
    else
        node ./app.js
fi
