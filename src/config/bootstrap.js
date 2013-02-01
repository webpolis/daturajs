/**
 * Bootstrap module. General setup, routes and environment initialization.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */

var controllers = require('../controllers')
,restControllers = require('../controllers/rest')
,path = require('path'), config = require('./main');

exports.init = function(app, express, rest){
    console.log('Bootstrapping...');
    
    // configure app
    app.configure(function(){
        app.set('portWww', process.env.APP_UNCOMMON_WWW_PORT || process.argv[2] || 3333);
        app.set('portRest', process.env.APP_UNCOMMON_REST_PORT || process.argv[3] || 3339);
        app.set('views', __dirname + '/src/views');
        app.set('view engine', 'ejs');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser(config.development.secretKey));
        app.use(express.session());
        app.use(app.router);

        // load less-middleware
        app.use(require('less-middleware')({
            src: __dirname + '/../src/assets/less',
            dest:__dirname+'/../../public/css',
            compress:true,
            prefix: '/stylesheets'
        }));
        
        // allow http access to /public
        app.use(express.static(path.join(__dirname, 'public')));
    });
    
    // rest instance startup
    rest.listen(app.get('portRest'));
    
    // initialize routes
    config.routes.forEach(function(route){
        if(typeof route.url !== 'undefined' && typeof route.action !== 'undefined'){
            route.method = route.methods || 'get';
            var c = route.action.split('/')[0] || null;
            var a = route.action.split('/')[1] || null;
            var isRest = route.isRest || false;
            
            if(c!==null){
                switch(route.method){
                    case 'get':
                        if(!isRest){
                            app.get(route.url, a!== null?controllers[c+'Controller']()[a]:controllers[c+'Controller']());
                        }else{
                            rest.get(route.url, a!== null?restControllers[c+'Controller']()[a]:restControllers[c+'Controller']());
                        }
                        break;
                }
            }
        }
    });
}
