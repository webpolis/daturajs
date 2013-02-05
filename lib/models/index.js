/**
 * Models initialization file.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */

var orm = require("orm")
,fs = require('fs')
,path = require('path')
,vm = require('vm')
,config = require(path.resolve(__dirname+'/../../src/config/main'))
,lib = require(path.resolve(__dirname+'/../'));

// dynamically build models array for internal usage.
fs.readdir(path.resolve(__dirname+'/../../src/models'),function(err,l){
    var js = path.basename(l,'.js').split(',');
    js.forEach(function(j){
        if(!/index/i.test(j)){
            lib.core.models[j]={}
        } 
    });
});

// instantiate orm for collected models
orm.connect([
    config.main.db.driver
    ,'://'
    ,config.main.db.username
    ,':'
    ,config.main.db.password
    ,'@'
    ,config.main.db.host
    ,'/'
    ,config.main.db.database
    ].join(''), function (err, db) {
        if (err) throw err;
        
        for(var m in lib.core.models){
            db.load(path.resolve(__dirname+'/../../src/models')+'/'+m,function(err){
                if (err) throw err;
                    
                lib.core.models[m] = db.models[m];
            });
        }
    });
    
module.exports = lib.core.models;