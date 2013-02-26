/**
 * Bootstrap module. General setup, routes and environment initialization.
 * 
 * All the application is initialized here.
 * 
 * @todo    Include src/bootstrap.js for custom initialization.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nico@webpolis.com.ar>
 */

var lib = require('./')
        , path = require('path')
        , routes = require(path.resolve(__dirname + '/../src/config/routes'))
        , config = require(path.resolve(__dirname + '/../src/config/main'))
        , layout = require('express3-ejs-layout')
        , auth = require('./components/auth');

/**
 * The following is a list of path strings widely accessed by this application.
 */
var pathDefinition = {
    'public': path.resolve(__dirname + '/../public'),
    'assets': path.resolve(__dirname + '/../src/assets')
};
exports.pathDefinition = pathDefinition;

exports.init = function(app, express, rest) {
    console.log('Bootstrapping...');

    // configure app
    app.configure(function() {
        app.set('portWww', process.env.APP_UNCOMMON_WWW_PORT || process.argv[2] || 80);
        app.set('portRest', process.env.APP_UNCOMMON_REST_PORT || process.argv[3] || 0);
        app.set('views', path.resolve(__dirname + '/src/views'));
        app.set('view engine', 'ejs');
        app.set('layout', path.resolve(__dirname + '/../src/views/layouts/main'));
        app.set('vars', config.main.params);
        app.use(layout);
        app.use(express.compress());
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser(config.main.secretKey));
        app.use(express.session());
        app.use(app.router);

        if (rest && rest !== null) {
            // configure restify
            rest.use(require('restify').bodyParser({
                mapParams: false
            }));
            rest.use(require('restify').gzipResponse());
            rest.use(require('restify').acceptParser(rest.acceptable));
            rest.opts(/\.*/, function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type");
                res.header('Access-Control-Allow-Methods', 'POST,GET,PUT');
                res.send(200);
                next();
            });
            rest.use(require('restify').fullResponse());
        }

        // load less-middleware
        app.use(require('less-middleware')({
            src: pathDefinition['assets'] + '/less',
            dest: pathDefinition['public'] + '/css',
            compress: true,
            prefix: '/css'
        }));

        // initialize auth
        if (typeof config.main.auth === 'object') {
            app.use(auth.initialize);
        }

        // allow http access to /public
        app.use(express.static(pathDefinition['public']));
    });

    // synchronously initialize controllers
    var restControllers = require('./controllers/rest');
    var controllers = require('./controllers');

    var _runCbk = function() {
        // initialize routes and prepare for listening requests
        routes.main.forEach(function(route) {
            if (typeof route.url !== 'undefined' && typeof route.action !== 'undefined') {
                var target = route.url instanceof Array ? route.url : [route.url];
                var defAction = 'index';

                route.method = route.method || 'get';
                var ss = route.action.replace(/^\/(.*)$/g, '$1').split('/');
                var c = ss[0] || null;
                var a = ss[ss.length - 1] || defAction;
                var isRest = route.isRest || false;

                if (c !== null) {
                    var cc = !isRest ?
                            lib.core.controllers.main[c + 'Controller']
                            : lib.core.controllers.rest[c + 'Controller'];

                    // set default action if none is given
                    if (typeof cc === 'undefined')
                        cc = {}
                    if (typeof cc[defAction] === 'undefined') {
                        cc[defAction] = function(req, res) {
                        }
                    }

                    switch (route.method) {
                        case 'get':
                        case 'post':
                            target.forEach(function(url) {
                                try {
                                    if (!isRest) {
                                        app[route.method](url, function(req, res) {
                                            // make components available to controller
                                            cc = Object.merge(require('./components'), cc);
                                            Object.defineProperty(cc, '_request', {
                                                value: req,
                                                enumerable: false,
                                                writable: false,
                                                configurable: true
                                            });
                                            Object.defineProperty(cc, '_response', {
                                                value: res,
                                                enumerable: false,
                                                writable: false,
                                                configurable: true
                                            });

                                            // set req body to be accessed via data
                                            cc.data = req.body ? req.body : null;
                                            cc.params = req.params ? req.params : null;

                                            cc[a](req, res);
                                        });
                                    } else if (rest && rest !== null) {
                                        var cbk = function(req, res, nxt) {
                                            // set req body to be accessed via data
                                            cc.data = req.body ? req.body : null;
                                            cc.params = req.params ? req.params : null;

                                            // make components available to controller
                                            cc = Object.merge(require('./components'), cc);

                                            if (typeof cc._request === 'undefined')
                                                Object.defineProperty(cc, '_request', {
                                                    value: req,
                                                    enumerable: false,
                                                    writable: false,
                                                    configurable: false
                                                });

                                            if (typeof cc._response === 'undefined')
                                                Object.defineProperty(cc, '_response', {
                                                    value: res,
                                                    enumerable: false,
                                                    writable: false,
                                                    configurable: false
                                                });

                                            cc[a](req, res, nxt);
                                        };
                                        rest[route.method](url, cbk);
                                    }
                                } catch (e) {
                                    console.trace(e)
                                }
                            });
                            break;
                        case 'put':
                            if (rest && rest !== null) {
                                target.forEach(function(url) {
                                    rest.put(url, function(req, res, nxt) {
                                        // set req body to be accessed via data
                                        cc.data = req.body ? req.body : null;
                                        cc.params = req.params ? req.params : null;

                                        // make components available to controller
                                        cc = Object.merge(require('./components'), cc);

                                        if (typeof cc._request === 'undefined')
                                            Object.defineProperty(cc, '_request', {
                                                value: req,
                                                enumerable: false,
                                                writable: false,
                                                configurable: false
                                            });

                                        if (typeof cc._response === 'undefined')
                                            Object.defineProperty(cc, '_response', {
                                                value: res,
                                                enumerable: false,
                                                writable: false,
                                                configurable: false
                                            });

                                        cc[a](req, res, nxt);
                                    });
                                });
                            }
                            break;
                    }
                }
            }
        });

        if (rest && rest !== null)
            // rest instance startup
            rest.listen(app.get('portRest'));
    };

    // init
    if (rest && rest !== null) {
        restControllers.init(function() {
            controllers.init(_runCbk);
        })
    } else {
        controllers.init(_runCbk);
    }
}
