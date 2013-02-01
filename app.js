/**
 * Starting point. This file initializes server.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var express = require('express')
, http = require('http')
, bootstrap = require('./src/config/bootstrap.js')
, restify = require('restify');

var app = express();

/**
 * The restify instance processes all REST in/out traffic.
 */
var rest = restify.createServer();

/**
 * General initialization. Must be run between rest & http initialization.
 */
bootstrap.init(app, express, rest);

/**
 * The http server instance processes all routing from/to presentation layer.
 */
http.createServer(app).listen(app.get('portWww'), function(){
    console.log("Server listening on port " + app.get('portWww'));
});
