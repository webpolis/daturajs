/**
 * Models initialization file.
 * 
 * You will not likely need to modify this file.
 * 
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var fs = require('fs')
,path = require('path')
,config = require(path.resolve(__dirname+'/../../src/config/main'))
,lib = require(path.resolve(__dirname+'/../'))
,db = require(path.resolve(__dirname+'/../adapters/db'));

// initialize sequelize.
var dbAdapter = db().initialize();

// dynamically build models array for internal usage.
fs.readdir(path.resolve(__dirname+'/../../src/models'),function(err,l){
    l.forEach(function(j){
        j = path.basename(j,'.js');
        if(!/index/i.test(j)){
            try{
                lib.core.models[j]=db().loadModel(j);
            }catch(e){
                console.log('[error] '+e.message);
            }
        } 
    });
});

module.exports = lib.core.models;