/**
 * Generates daturajs skeleton based on provided database schema.
 * At the moment, only supporting Postgresql/MySQL with Sequelize ORM.
 * 
 * Internally, this script will fetch all tables names using the db configuration 
 * set in src/config/main.js and will generate a new model in src/models for each.
 * 
 * @todo    Obtain foreign indexes and generate appropiate "model association" source code.
 * 
 * ATTENTION! This will overwrite existing models.
 * 
 * @author Nicolas Iglesias <nico@webpolis.com.ar>
 */

var fs = require('fs')
,ejs=require('ejs')
,pg=require('pg')
,mysql=require('mysql')
,path = require('path')
,inflector = require('inflector')
,seq = require('sequelize')
,modelName = null, appName = null, tables = [];

// arguments processor
var opts = require('optimist')
.usage('Generates daturajs application skeleton.\nUsage: $0')
.demand('a')
.alias('a', 'name')
.describe('a', 'Set your application\'s name')
.alias('m', 'model')
.describe('m', 'Only process defined model')
.alias('r', 'rest')
.describe('r', 'Set REST listening port number or 0 to disable REST support')
.default('r', 8081)
.alias('w', 'http')
.describe('w', 'Set HTTP listening port number')
.default('w', 80)
.alias('c', 'config')
.describe('c', 'Configuration file')
.default('c', path.resolve(__dirname+'/../../src/config/main.js'))
.argv;

modelName = opts.model ? opts.model.trim().singular() : null;
appName = opts.name.trim();

// require defined config file
var config = require(path.resolve(opts.config))

// define type mapping
var typeMap = {
    varchar:'string',
    'char':'string',
    text:'text',
    'int':'integer',
    'integer':'integer',
    timestamp:'date',
    date:'date',
    datetime:'date',
    bool:'boolean',
    tinyint:'integer',
    numeric:'float',
    'float':'float',
    'double':'float'
}

// set queries and custom connection startup
var con, client, qc, qt = null;
switch(config.main.db.driver){
    case 'postgres':
        con = 'tcp://'
            +config.main.db.username
            +':'
            +config.main.db.password
            +'@'
            +config.main.db.host
            +'/'
            +config.main.db.database;
        client = new pg.Client(con);
        
        // query for retrieving tables list
        qt = "select * from information_schema.tables as t where t.table_catalog = '"
            +config.main.db.database+"' "
            +"and t.table_schema = 'public'";
        // query for retrieving columns info
        qc = "\
SELECT c.relname as Table, a.attnum, a.attname AS Field, t.typname AS Type, \
    a.attlen AS Length, a.atttypmod AS length_var, \
    a.attnotnull AS Null, a.atthasdef as has_default \
FROM pg_class c, pg_attribute a, pg_type t \
WHERE c.relname = '$$table' \
  AND a.attnum > 0 \
  AND a.attrelid = c.oid \
  AND a.atttypid = t.oid \
ORDER BY a.attnum;\
";
        break;
    case 'mysql':
        client = mysql.createConnection({
            host:config.main.db.host,
            user:config.main.db.username,
            password:config.main.db.password,
            database:config.main.db.database,
            port:config.main.db.port
        });
        qt = 'SHOW TABLES FROM '+config.main.db.database;
        qc = 'SHOW FULL COLUMNS FROM $$table FROM '+config.main.db.database;
        break;
}

// retrieve table names
var fnTables = function(r){
    var tableName, queryCols, o = {};
    
    switch(config.main.db.driver){
        case 'postgres':
            tableName = r.table_name;
            break;
        case 'mysql':
            tableName = r['Tables_in_'+config.main.db.database];
            break;
    }
    
    queryCols = qc.replace(/\$\$table/gi,tableName);
    o.queryColumns = queryCols;
    tables[tableName] = o;
}

client.connect(function(err) {
    if(err) throw new Error(err).stack;
    
    // get tables list
    var evRow= null;
    var qtt = client.query(qt);
    
    switch(config.main.db.driver){
        case 'postgres':
            evRow = 'row';
            break;
        case 'mysql':
            evRow = 'result';
            break;
    }
    
    qtt.on(evRow,fnTables);
    qtt.on('end',function(){
        for(var t in tables){
            if(modelName!== null && modelName !== t.singular()) continue;
            
            var qqc = client.query(tables[t].queryColumns);
            qqc.on(evRow,function(c,d){
                var tt = null;
                switch(config.main.db.driver){
                    case 'postgres':
                        tt = c.table;
                        break;
                    case 'mysql':
                        tt = this.sql.replace(/^.*columns from ([^\s]+).*$/gi,'$1');
                        break;
                }
                if(typeof tables[tt].columns === 'undefined')
                    tables[tt].columns = [];
                tables[tt].columns.push(c);
            });
            qqc.on('end',function(){
                });
        }
        
        setTimeout(function(){
            client.end();
            
            var authModel = null, models = [];
            
            var _generateSkeleton = function(){
                for(tt in tables){
                    if(modelName!== null && modelName !== tt.singular()) continue;
                
                    // construct model obj
                    var model = {}
                    model.name = tt.singular();
                    model.label = tt.singular().humanize();
                
                    var camel = model.label.camelize()[0].toLowerCase()+model.label.camelize().substr(1,tt.length-1);
                    model.camelName = camel;
                    model.pluralName = camel.plural();
                    model.fields = [];
                
                    fs.mkdir(path.resolve(__dirname+'/../../src/views/'+model.camelName),0755);
                
                    var fieldNames = [];
                    
                    // setup model's fields
                    tables[tt].columns.forEach(function(c){
                        var mm = parseInt(c.Type.replace(/.*\((\d+)\).*/g,'$1'));
                        var type = /int\d+/.test(c.Type) ? typeMap['int'] : typeMap[c.Type.replace(/\([^\)]+\)/g,'')];
                        type = type === undefined ? typeMap['varchar'] : type;
                        var req = c.Null === 'NO' || c.Null == false ? true : false;
                        var isPrimary = ((type === typeMap['int'] && c.Field === 'id') 
                            || (type === typeMap['int'] && c.Field === tt.singular()+'_id'));
                        var max = c.length_var && c.length_var!==-1 ? parseInt(c.Length) 
                        : (typeof mm === 'number' && !isNaN(mm)?mm:undefined)

                        fieldNames.push(c.Field);
                    
                        model.fields.push({
                            name:c.Field,
                            label:c.Field,
                            type:type,
                            required:req,
                            primaryKey:isPrimary,
                            max:max
                        });
                    });
                
                    // toggle auth status
                    model.isAuthModel = ((model.name === 'user' || model.name === 'account' || model.name === 'admin') 
                        && (fieldNames.indexOf('password')!== -1 && fieldNames.indexOf('username')!== -1))
                    
                    if(authModel===null)
                        authModel = model.isAuthModel ? model.name : null;
                
                    // load & populate templates
                    var templateModel = require('fs').readFileSync(__dirname + '/skeleton/models/template.ejs', 'utf8');
                    var templateController = require('fs').readFileSync(__dirname + '/skeleton/controllers/template.ejs', 'utf8');
                    var templateRest = require('fs').readFileSync(__dirname + '/skeleton/controllers/rest/template.ejs', 'utf8');
                    var templateAngular = require('fs').readFileSync(__dirname + '/skeleton/controllers/angular/template.ejs', 'utf8');
                    var templateListView = require('fs').readFileSync(__dirname + '/skeleton/views/templateList.ejs', 'utf8');
                    var templateFormView = require('fs').readFileSync(__dirname + '/skeleton/views/templateForm.ejs', 'utf8');
                
                    // model template
                    var outModel = ejs.render(templateModel,{
                        model:model,
                        fieldsList : fieldNames
                    });
                    // controller template
                    var outController = ejs.render(templateController,{
                        model:model,
                        fieldsList : fieldNames
                    });
                    // REST controller template
                    var outRestController = ejs.render(templateRest,{
                        model:model,
                        fieldsList : fieldNames
                    });
                    // Angular controller template
                    var outAngularController = ejs.render(templateAngular,{
                        model:model,
                        fieldsList : fieldNames
                    });
                    // list view template
                    var outListView = ejs.render(templateListView,{
                        model:model,
                        fieldsList : fieldNames
                    });
                    // form view template
                    var outFormView = ejs.render(templateFormView,{
                        model:model,
                        fieldsList : fieldNames
                    });
                
                    var modelFile = path.resolve(__dirname+'/../../src/models/'+model.camelName+'.js');
                    var controllerFile = path.resolve(__dirname+'/../../src/controllers/'+model.camelName+'Controller.js');
                    var restControllerFile = path.resolve(__dirname+'/../../src/controllers/rest/'+model.camelName+'Controller.js');
                    var angularControllerFile = path.resolve(__dirname+'/../../public/js/angular/controllers/'+model.camelName+'Controller.js');
                    var listViewFile = path.resolve(__dirname+'/../../src/views/'+model.camelName+'/list.ejs');
                    var formViewFile = path.resolve(__dirname+'/../../src/views/'+model.camelName+'/form.ejs');

                    models.push(model);
                
                    // write files
                    fs.writeFile(modelFile, outModel.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                    fs.writeFile(controllerFile, outController.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                    fs.writeFile(restControllerFile, outRestController.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                    fs.writeFile(angularControllerFile, outAngularController.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                    fs.writeFile(listViewFile, outListView.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                    fs.writeFile(formViewFile, outFormView.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                }
            
                // set config templates
                var app = {};
                app.name = appName;
                app.secret = Math.ceil(Date.now()*Math.random()*100000);
                app.authModel = authModel;
                app.restPort = parseInt(opts.rest);
                app.wwwPort = parseInt(opts.http);
            
                var templateMain = require('fs').readFileSync(__dirname + '/skeleton/config/templateMain.ejs', 'utf8');
                var templateRoutes = require('fs').readFileSync(__dirname + '/skeleton/config/templateRoutes.ejs', 'utf8');
                var templateAngularRes = require('fs').readFileSync(__dirname + '/skeleton/assets/js/angular/templateResource.ejs', 'utf8');
                var templateLayoutMain = require('fs').readFileSync(__dirname + '/skeleton/views/layouts/templateMain.ejs', 'utf8');
                var templateLayoutHeader = require('fs').readFileSync(__dirname + '/skeleton/views/layouts/templateHeader.ejs', 'utf8');
                var templateLayoutFooter = require('fs').readFileSync(__dirname + '/skeleton/views/layouts/templateFooter.ejs', 'utf8');
                var templateSidebar = require('fs').readFileSync(__dirname + '/skeleton/views/elements/templateSidebar.ejs', 'utf8');
                var templateStart = require('fs').readFileSync(__dirname + '/skeleton/templateStart.ejs', 'utf8');
            
                var outMain = ejs.render(templateMain,{
                    app : app,
                    config : config
                });
                var outRoutes = ejs.render(templateRoutes,{
                    app : app,
                    config : config,
                    models : models
                });
                var outAngularRes = ejs.render(templateAngularRes,{
                    app : app,
                    config : config,
                    models : models
                });
                var outLayoutMain = ejs.render(templateLayoutMain,{
                    app : app,
                    config : config,
                    models : models
                });
                var outLayoutHeader = ejs.render(templateLayoutHeader,{
                    app : app,
                    config : config,
                    models : models
                });
                var outLayoutFooter = ejs.render(templateLayoutFooter,{
                    app : app,
                    config : config,
                    models : models
                });
                var outSidebar = ejs.render(templateSidebar,{
                    app : app,
                    config : config,
                    models : models
                });
                var outStart = ejs.render(templateStart,{
                    app : app,
                    config : config,
                    models : models
                });
            
                var mainFile = path.resolve(__dirname+'/../../src/config/main.js');
                var routesFile = path.resolve(__dirname+'/../../src/config/routes.js');
                var angularResFile = path.resolve(__dirname+'/../../public/js/angular/resourceService.js');
                var layoutMainFile = path.resolve(__dirname+'/../../src/views/layouts/main.ejs');
                var layoutHeaderFile = path.resolve(__dirname+'/../../src/views/layouts/header.ejs');
                var layoutFooterFile = path.resolve(__dirname+'/../../src/views/layouts/footer.ejs');
                var sidebarFile = path.resolve(__dirname+'/../../src/views/elements/sidebar.ejs');
                var startFile = path.resolve(__dirname+'/../../start.sh');
                
                // write files
                fs.writeFile(mainFile, outMain.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                fs.writeFile(routesFile, outRoutes.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                fs.writeFile(angularResFile, outAngularRes.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                fs.writeFile(layoutMainFile, outLayoutMain.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                fs.writeFile(layoutHeaderFile, outLayoutHeader.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                fs.writeFile(layoutFooterFile, outLayoutFooter.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                fs.writeFile(sidebarFile, outSidebar.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
                fs.writeFile(startFile, outStart.replace(/\{{3}/g,'<%').replace(/\}{3}/g,'%>'));
            }
            
            // generate dirs
            fs.mkdir(path.resolve(__dirname+'/../../public'),0755,function(err){
                fs.mkdir(path.resolve(__dirname+'/../../public/js'),0755, function(){
                    fs.mkdir(path.resolve(__dirname+'/../../public/js/angular'),0755,function(){
                        fs.mkdir(path.resolve(__dirname+'/../../public/js/angular/controllers'),0755);
                    });
                });
                fs.mkdir(path.resolve(__dirname+'/../../public/css'),0755);
                fs.mkdir(path.resolve(__dirname+'/../../public/img'),0755);
                
                fs.mkdir(path.resolve(__dirname+'/../../src/assets'),0755,function(err){
                    fs.mkdir(path.resolve(__dirname+'/../../src/assets/less'),0755, function(){
                        fs.mkdir(path.resolve(__dirname+'/../../src/models'),0755, function(){
                            fs.mkdir(path.resolve(__dirname+'/../../src/controllers'),0755,function(err){
                                fs.mkdir(path.resolve(__dirname+'/../../src/controllers/rest'),0755, function(){
                                    fs.mkdir(path.resolve(__dirname+'/../../src/views'),0755,function(){
                                        fs.mkdir(path.resolve(__dirname+'/../../src/views/layouts'),0755,function(){
                                            fs.mkdir(path.resolve(__dirname+'/../../src/views/elements'),0755,_generateSkeleton);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }, 5000);
    });
});