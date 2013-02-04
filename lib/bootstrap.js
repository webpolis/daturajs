/**
 * Bootstrap module. General setup, routes and environment initialization.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */

var models = require('./models')
,path = require('path')
,routes = require('../src/config/routes')
,config = require('../src/config/main');

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
        app.set('views', __dirname + '/src/views');
        app.set('view engine', 'ejs');
        app.use(express.compress());
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser(config.main.secretKey));
        app.use(express.session());
        app.use(app.router);

        // load less-middleware
        app.use(require('less-middleware')({
            src:pathDefinition['assets']+'/less',
            dest:pathDefinition['public']+'/css',
            compress:true,
            prefix: '/css'
        }));
        
        // allow http access to /public
        app.use(express.static(pathDefinition['public']));
    });
    
    // The following is injected to all controllers.
    var _shared = {
        models:models,
        utils:null
    }
    
    // synchronously initialize controllers
    var restControllers = require('./controllers/rest');
    var controllers = require('./controllers');
    
    restControllers.init(function(){
        controllers.init(function(){
            // initialize routes and prepare for listening requests
            routes.main.forEach(function(route){
                if(typeof route.url !== 'undefined' && typeof route.action !== 'undefined'){
                    var path = route.url instanceof Array ? route.url:[route.url];
                    var defAction = 'index';
            
                    route.method = route.methods || 'get';
                    var c = route.action.split('/')[0] || null;
                    var a = route.action.split('/')[1] || defAction;
                    var isRest = route.isRest || false;
            
                    if(c!==null){
                        var cc = !isRest?
                        lib.core.controllers.main[c+'Controller'](_shared)
                        :lib.core.controllers.rest[c+'Controller'](_shared);

                        // set default action if none is given
                        if(typeof cc[defAction] === 'undefined'){
                            cc[defAction] = function(req,res){}
                        }
                        
                        switch(route.method){
                            case 'get':
                                path.forEach(function(url){
                                    try{
                                        if(!isRest){
                                            app.get(url, cc[a]);
                                        }else{
                                            rest.get(url, cc[a]);
                                        }
                                    }catch(e){
                                        console.log('[error] '+e.message);
                                    }
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