/**
 * Bootstrap module. General setup, routes and environment initialization.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */

var lib = require('./')
,path = require('path')
,routes = require(path.resolve(__dirname+'/../src/config/routes'))
,config = require(path.resolve(__dirname+'/../src/config/main'))
,layout = require('express3-ejs-layout')
,auth = require('./components/auth');

/**
 * The following is a list of path strings widely accessed by this application.
 */
var pathDefinition = {
    'public':path.resolve(__dirname+'/../public'),
    'assets':path.resolve(__dirname+'/../src/assets')
};
exports.pathDefinition = pathDefinition;

exports.init = function(app, express, rest){
    console.log('Bootstrapping...');
    
    // configure app
    app.configure(function(){
        app.set('portWww', process.env.APP_UNCOMMON_WWW_PORT || process.argv[2] || 3333);
        app.set('portRest', process.env.APP_UNCOMMON_REST_PORT || process.argv[3] || 3339);
        app.set('views', path.resolve(__dirname + '/src/views'));
        app.set('view engine', 'ejs');
        app.set('layout', path.resolve(__dirname+'/../src/views/layouts/main'));
        app.set('params',config.main.params);
        app.use(layout);
        app.use(express.compress());
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser(config.main.secretKey));
        app.use(express.session());
        app.use(app.router);

        // configure restify
        rest.use(require('restify').bodyParser({
            mapParams: false
        }));
        rest.use(require('restify').gzipResponse());
        rest.use(require('restify').acceptParser(rest.acceptable));
        rest.opts(/\.*/, function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type");
            res.header('Access-Control-Allow-Methods','POST,GET,PUT');
            res.send(200);
            next();
        });
        rest.use(require('restify').fullResponse());

        // load less-middleware
        app.use(require('less-middleware')({
            src:pathDefinition['assets']+'/less',
            dest:pathDefinition['public']+'/css',
            compress:true,
            prefix: '/css'
        }));
        
        // initialize auth
        if(typeof config.main.auth==='object'){
            app.use(auth().initialize);
        }
        
        // allow http access to /public
        app.use(express.static(pathDefinition['public']));
    });
    
    // synchronously initialize controllers
    var restControllers = require('./controllers/rest');
    var controllers = require('./controllers');
    
    restControllers.init(function(){
        controllers.init(function(){
            // initialize routes and prepare for listening requests
            routes.main.forEach(function(route){
                if(typeof route.url !== 'undefined' && typeof route.action !== 'undefined'){
                    var target = route.url instanceof Array ? route.url:[route.url];
                    var defAction = 'index';
            
                    route.method = route.method || 'get';
                    var c = route.action.split('/')[0] || null;
                    var a = route.action.split('/')[1] || defAction;
                    var isRest = route.isRest || false;
            
                    if(c!==null){
                        var cc = !isRest?
                        lib.core.controllers.main[c+'Controller']
                        :lib.core.controllers.rest[c+'Controller'];

                        // set default action if none is given
                        if(typeof cc === 'undefined')
                            cc = {}
                        if(typeof cc[defAction] === 'undefined'){
                            cc[defAction] = function(req,res){}
                        }

                        switch(route.method){
                            case 'get':
                            case 'post':
                                target.forEach(function(url){
                                    try{
                                        if(!isRest){
                                            app[route.method](url, function(req, res){
                                                // setup method for render
                                                cc.$$.render = function(view,data,cbk){
                                                    var viewFile = null, 
                                                    data = typeof data !== 'undefined'?data:{};
                                                    data.auth = req.cookies.auth || false;
                                                    
                                                    if(typeof view.layout !== 'undefined'){
                                                        viewFile = path.resolve(__dirname+'/../src/views/'+c+'/'+view.view);
                                                        layoutFile = path.resolve(__dirname+'/../src/views/layouts/'+view.layout);
                                                        data.layout = layoutFile;
                                                        res.render(viewFile,data);
                                                    }else{
                                                        viewFile = path.resolve('./src/views/'+c+'/'+view);
                                                        res.render(viewFile,data,cbk);
                                                    }
                                                }
                                                cc.$$.app = app;
                                                cc[a](req, res);
                                            });
                                        }else{
                                            var cbk = function(req, res, nxt){
                                                // setup method for output
                                                cc.$$.send = function(status, data){
                                                    res.send(status, data);
                                                }
                                                cc[a](req, res, nxt);
                                            };
                                            rest[route.method](url, cbk);
                                        }
                                    }catch(e){
                                        console.log('[error] '+e.message);
                                    }
                                });
                                break;
                            case 'put':
                                target.forEach(function(url){
                                    rest.put(url, function(req, res, nxt){
                                        // setup method for output
                                        cc.$$.send = function(status, data){
                                            res.send(status, data);
                                        }
                                        cc[a](req, res, nxt);
                                    });
                                });
                                break;
                        }
                    }
                }
            });
            
            // rest instance startup
            rest.listen(app.get('portRest'));
        });
    });

}
